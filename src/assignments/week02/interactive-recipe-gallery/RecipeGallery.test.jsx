import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'
import RecipeGallery, { images } from './RecipeGallery'

afterEach(() => {
  cleanup()
})

describe('RecipeGallery standalone exercise', () => {
  test('normal: renders the first recipe by default', () => {
    render(<RecipeGallery />)

    expect(screen.getByTestId('gallery-description')).toHaveTextContent(images[0].description)
    expect(screen.getByTestId('gallery-position')).toHaveTextContent(`Recipe 1 of ${images.length}`)
  })

  test('normal: clicking Next moves to the next recipe', () => {
    render(<RecipeGallery />)

    fireEvent.click(screen.getByRole('button', { name: /next recipe/i }))

    expect(screen.getByTestId('gallery-description')).toHaveTextContent(images[1].description)
    expect(screen.getByTestId('gallery-position')).toHaveTextContent(`Recipe 2 of ${images.length}`)
  })

  test('normal: clicking Previous after advancing returns to the earlier recipe', () => {
    render(<RecipeGallery />)

    fireEvent.click(screen.getByRole('button', { name: /next recipe/i }))
    fireEvent.click(screen.getByRole('button', { name: /previous recipe/i }))

    expect(screen.getByTestId('gallery-description')).toHaveTextContent(images[0].description)
    expect(screen.getByTestId('gallery-position')).toHaveTextContent(`Recipe 1 of ${images.length}`)
  })

  test('edge: Previous is disabled on the first recipe', () => {
    render(<RecipeGallery />)

    const previousButton = screen.getByRole('button', { name: /previous recipe/i })

    expect(previousButton).toBeDisabled()
    expect(screen.getByTestId('gallery-description')).toHaveTextContent(images[0].description)
  })

  test('edge: Next is disabled on the last recipe', () => {
    render(<RecipeGallery />)

    const nextButton = screen.getByRole('button', { name: /next recipe/i })

    for (let index = 1; index < images.length; index += 1) {
      fireEvent.click(nextButton)
    }

    expect(nextButton).toBeDisabled()
    expect(screen.getByTestId('gallery-description')).toHaveTextContent(
      images[images.length - 1].description
    )
    expect(screen.getByTestId('gallery-position')).toHaveTextContent(
      `Recipe ${images.length} of ${images.length}`
    )
  })

  test('edge: navigation does not move before the first or past the last recipe', () => {
    render(<RecipeGallery />)

    const previousButton = screen.getByRole('button', { name: /previous recipe/i })
    const nextButton = screen.getByRole('button', { name: /next recipe/i })

    fireEvent.click(previousButton)
    expect(screen.getByTestId('gallery-description')).toHaveTextContent(images[0].description)

    for (let index = 1; index < images.length; index += 1) {
      fireEvent.click(nextButton)
    }

    fireEvent.click(nextButton)

    expect(screen.getByTestId('gallery-description')).toHaveTextContent(
      images[images.length - 1].description
    )
    expect(screen.getByTestId('gallery-position')).toHaveTextContent(
      `Recipe ${images.length} of ${images.length}`
    )
  })
})
