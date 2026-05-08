import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'
import UserProfile, { initialUserProfile } from './UserProfile'

afterEach(() => {
  cleanup()
})

describe('UserProfile standalone exercise', () => {
  test('normal: renders the default user profile values', () => {
    render(<UserProfile />)

    expect(screen.getByTestId('profile-name')).toHaveTextContent(initialUserProfile.name)
    expect(screen.getByTestId('profile-email')).toHaveTextContent(initialUserProfile.email)
    expect(screen.getByTestId('profile-street')).toHaveTextContent(initialUserProfile.address.street)
    expect(screen.getByTestId('profile-city')).toHaveTextContent(initialUserProfile.address.city)
    expect(screen.getByTestId('profile-country')).toHaveTextContent(initialUserProfile.address.country)
  })

  test('normal: clicking update replaces all nested address fields', () => {
    render(<UserProfile />)

    fireEvent.change(screen.getByTestId('street-input'), { target: { value: '456 State Street' } })
    fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'Hooksville' } })
    fireEvent.change(screen.getByTestId('country-input'), { target: { value: 'Reactonia' } })
    fireEvent.click(screen.getByRole('button', { name: /update address/i }))

    expect(screen.getByTestId('profile-street')).toHaveTextContent('456 State Street')
    expect(screen.getByTestId('profile-city')).toHaveTextContent('Hooksville')
    expect(screen.getByTestId('profile-country')).toHaveTextContent('Reactonia')
  })

  test('normal: top-level profile fields remain unchanged after nested updates', () => {
    render(<UserProfile />)

    fireEvent.change(screen.getByTestId('street-input'), { target: { value: '900 Component Court' } })
    fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'Render Bay' } })
    fireEvent.change(screen.getByTestId('country-input'), { target: { value: 'UI Republic' } })
    fireEvent.click(screen.getByRole('button', { name: /update address/i }))

    expect(screen.getByTestId('profile-name')).toHaveTextContent(initialUserProfile.name)
    expect(screen.getByTestId('profile-email')).toHaveTextContent(initialUserProfile.email)
  })

  test('edge: empty strings are applied without crashing', () => {
    render(<UserProfile />)

    fireEvent.change(screen.getByTestId('street-input'), { target: { value: '' } })
    fireEvent.change(screen.getByTestId('city-input'), { target: { value: '' } })
    fireEvent.change(screen.getByTestId('country-input'), { target: { value: '' } })
    fireEvent.click(screen.getByRole('button', { name: /update address/i }))

    expect(screen.getByTestId('profile-street')).toHaveTextContent('')
    expect(screen.getByTestId('profile-city')).toHaveTextContent('')
    expect(screen.getByTestId('profile-country')).toHaveTextContent('')
  })

  test('edge: repeated updates replace the nested address with the latest values', () => {
    render(<UserProfile />)

    fireEvent.change(screen.getByTestId('street-input'), { target: { value: '111 First Pass' } })
    fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'Draft City' } })
    fireEvent.change(screen.getByTestId('country-input'), { target: { value: 'Version One' } })
    fireEvent.click(screen.getByRole('button', { name: /update address/i }))

    fireEvent.change(screen.getByTestId('street-input'), { target: { value: '222 Final Pass' } })
    fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'Release Town' } })
    fireEvent.change(screen.getByTestId('country-input'), { target: { value: 'Version Two' } })
    fireEvent.click(screen.getByRole('button', { name: /update address/i }))

    expect(screen.getByTestId('profile-street')).toHaveTextContent('222 Final Pass')
    expect(screen.getByTestId('profile-city')).toHaveTextContent('Release Town')
    expect(screen.getByTestId('profile-country')).toHaveTextContent('Version Two')
  })

  test('edge: the profile summary stays aligned with the rendered nested fields', () => {
    render(<UserProfile />)

    fireEvent.change(screen.getByTestId('street-input'), { target: { value: '78 Immutable Ave' } })
    fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'Spread City' } })
    fireEvent.change(screen.getByTestId('country-input'), { target: { value: 'Functional State' } })
    fireEvent.click(screen.getByRole('button', { name: /update address/i }))

    expect(screen.getByTestId('profile-summary')).toHaveTextContent(
      '78 Immutable Ave, Spread City, Functional State'
    )
    expect(screen.getByTestId('profile-street')).toHaveTextContent('78 Immutable Ave')
    expect(screen.getByTestId('profile-city')).toHaveTextContent('Spread City')
    expect(screen.getByTestId('profile-country')).toHaveTextContent('Functional State')
  })
})
