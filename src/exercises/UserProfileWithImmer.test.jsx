import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'
import UserProfileWithImmer, { initialUserProfile } from './UserProfileWithImmer'

afterEach(() => {
  cleanup()
})

describe('UserProfileWithImmer standalone exercise', () => {
  test('normal: renders the initial nested profile data', () => {
    render(<UserProfileWithImmer />)

    expect(screen.getByTestId('profile-name')).toHaveTextContent(initialUserProfile.name)
    expect(screen.getByTestId('profile-email')).toHaveTextContent(initialUserProfile.email)
    expect(screen.getByTestId('profile-phone')).toHaveTextContent(initialUserProfile.contactDetails.phone)
    expect(screen.getByTestId('profile-address')).toHaveTextContent(initialUserProfile.contactDetails.address)
    expect(screen.getByTestId('profile-newsletter')).toHaveTextContent('Subscribed')
  })

  test('normal: changing the inputs updates the nested contact details in real time', () => {
    render(<UserProfileWithImmer />)

    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'Avery Johnson' } })
    fireEvent.change(screen.getByTestId('phone-input'), { target: { value: '555-9999' } })
    fireEvent.change(screen.getByTestId('address-input'), {
      target: { value: '900 Draft Avenue, Proxy Point' },
    })

    expect(screen.getByTestId('profile-name')).toHaveTextContent('Avery Johnson')
    expect(screen.getByTestId('profile-phone')).toHaveTextContent('555-9999')
    expect(screen.getByTestId('profile-address')).toHaveTextContent('900 Draft Avenue, Proxy Point')
  })

  test('normal: clicking the checkbox toggles newsletter subscription', () => {
    render(<UserProfileWithImmer />)

    fireEvent.click(screen.getByTestId('newsletter-checkbox'))
    expect(screen.getByTestId('profile-newsletter')).toHaveTextContent('Not Subscribed')

    fireEvent.click(screen.getByTestId('newsletter-checkbox'))
    expect(screen.getByTestId('profile-newsletter')).toHaveTextContent('Subscribed')
  })

  test('edge: blank names are applied without crashing the component', () => {
    render(<UserProfileWithImmer />)

    fireEvent.change(screen.getByTestId('name-input'), { target: { value: '' } })

    expect(screen.getByTestId('profile-name')).toHaveTextContent('Name:')
    expect(screen.getByTestId('summary-name')).toHaveTextContent('—')
  })

  test('edge: updating contact details preserves unrelated nested preference fields', () => {
    render(<UserProfileWithImmer />)

    fireEvent.change(screen.getByTestId('phone-input'), { target: { value: '555-2020' } })
    fireEvent.change(screen.getByTestId('address-input'), {
      target: { value: '101 Immutable Way, State Harbor' },
    })

    expect(screen.getByTestId('profile-newsletter')).toHaveTextContent('Subscribed')
    expect(screen.getByTestId('profile-notifications')).toHaveTextContent('Enabled')
  })

  test('edge: toggling newsletter does not accidentally change the address or notifications', () => {
    render(<UserProfileWithImmer />)

    fireEvent.click(screen.getByTestId('newsletter-checkbox'))

    expect(screen.getByTestId('profile-address')).toHaveTextContent(initialUserProfile.contactDetails.address)
    expect(screen.getByTestId('profile-notifications')).toHaveTextContent('Enabled')
  })
})
