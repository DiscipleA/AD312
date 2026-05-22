import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import UserRegistrationForm, {
  REGISTRATION_STORAGE_KEY,
  createSubmissionSummary,
  hasDraftValues,
  isStrongPassword,
  isValidEmail,
  passwordsMatch,
  roleOptions,
  safeParseDraft,
} from './UserRegistrationForm'

/**
 * Week 7 Assignment 2 official Vitest tests
 * --------------------------------------------------------------------------------
 * These tests are written to teach students what a strong form test suite should
 * protect. They include at least 3 normal cases and 3 edge cases, matching the
 * assignment requirement.
 *
 * Testing strategy:
 * - Pure helper tests check validation logic quickly without rendering React.
 * - Render tests verify semantic labels, autofocus, validation messages, and the
 *   full submit/reset/localStorage lifecycle.
 * - Edge tests confirm invalid input, malformed cached drafts, and metadata stay
 *   predictable.
 *
 * The comments are intentionally detailed because the test file is displayed in
 * the assignment guide as instructional source code.
 */

/**
 * Fill the form with one valid user.
 *
 * userEvent is used instead of manually assigning input.value because it behaves
 * like a real user: typing fires keyboard/input/change events, selectOptions
 * triggers select behavior, and click toggles the checkbox. That means React Hook
 * Form receives updates the same way it would in the browser.
 */
async function fillValidForm(user) {
  await user.type(screen.getByLabelText('Full Name'), 'Avery Stone')
  await user.type(screen.getByLabelText('Email Address'), 'avery@example.com')
  await user.type(screen.getByLabelText('Password'), 'Secure123')
  await user.type(screen.getByLabelText('Confirm Password'), 'Secure123')
  await user.selectOptions(screen.getByLabelText('Role / Account Type'), 'Developer')
  await user.click(screen.getByLabelText(/I agree to the Terms/))
}

describe('Week 7 Assignment 2 - React Hook Form User Registration', () => {
  beforeEach(() => {
    /**
     * localStorage persists across tests unless it is cleared. The registration
     * component intentionally writes drafts to localStorage, so every test starts
     * with an empty cache to prevent one test from influencing another.
     */
    window.localStorage.clear()

    /**
     * Use real timers by default. The component supports a submissionDelay prop,
     * and most tests pass 0 to avoid waiting for the real 2-second preview delay.
     */
    vi.useRealTimers()
  })

  it('normal: validates helper rules for email, password, and matching passwords', () => {
    /**
     * Normal case 1:
     * These pure helper assertions prove the core validation rules accept good
     * values. They are fast and focused because no DOM rendering is needed.
     */
    expect(isValidEmail('student@example.com')).toBe(true)
    expect(isStrongPassword('Strong123')).toBe(true)
    expect(passwordsMatch('Strong123', 'Strong123')).toBe(true)
  })

  it('normal: renders every required form control with semantic labels', () => {
    /**
     * Normal case 2:
     * The assignment requires a semantic form with explicit labels. getByLabelText
     * proves that labels are correctly associated with their controls, which helps
     * accessibility, testing, and user experience.
     */
    render(<UserRegistrationForm submissionDelay={0} />)

    /**
     * Full Name should auto-focus on mount, satisfying the lifecycle/autofocus
     * requirement and helping users start the form immediately.
     */
    expect(screen.getByLabelText('Full Name')).toHaveFocus()

    /**
     * These expectations protect the required field list: full name, email,
     * password, confirm password, role dropdown, and terms checkbox.
     */
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Role / Account Type')).toBeInTheDocument()
    expect(screen.getByLabelText(/I agree to the Terms/)).toBeInTheDocument()
  })

  it('normal: submits valid data, resets the form, and clears localStorage', async () => {
    /**
     * Normal case 3:
     * This is the main happy-path integration test. It verifies that a valid form
     * can submit, the async submit handler resolves, the parent callback receives
     * a success result, the UI resets to defaults, and the draft cache is cleared.
     */
    const user = userEvent.setup()
    const onSuccessfulSubmit = vi.fn()
    render(<UserRegistrationForm submissionDelay={0} onSuccessfulSubmit={onSuccessfulSubmit} />)

    await fillValidForm(user)

    /**
     * React Hook Form updates validity through subscriptions. waitFor gives the
     * form time to process those updates before the submit button is clicked.
     */
    await waitFor(() => expect(screen.getByRole('button', { name: 'Create Account' })).toBeEnabled())
    await user.click(screen.getByRole('button', { name: 'Create Account' }))

    await waitFor(() => expect(onSuccessfulSubmit).toHaveBeenCalledTimes(1))

    /**
     * The success message proves the form submitted the selected values, not just
     * that a button click happened.
     */
    expect(onSuccessfulSubmit.mock.calls[0][0].message).toContain('Avery Stone registered as Developer')

    /**
     * reset(defaultRegistrationValues) should clear the visible fields after the
     * simulated API request succeeds.
     */
    expect(screen.getByLabelText('Full Name')).toHaveValue('')

    /**
     * Successful submission must also flush the cached draft from localStorage.
     */
    expect(window.localStorage.getItem(REGISTRATION_STORAGE_KEY)).toBeNull()
  })

  it('edge: invalid helper values are rejected', () => {
    /**
     * Edge case 1:
     * These assertions protect the negative side of the validation helpers. A form
     * that only accepts valid examples but fails to reject bad examples is not
     * sufficiently tested.
     */
    expect(isValidEmail('broken-email')).toBe(false)
    expect(isStrongPassword('weak')).toBe(false)
    expect(passwordsMatch('Secure123', 'Different123')).toBe(false)
  })

  it('edge: blocks submission and shows validation messages for missing or invalid values', async () => {
    /**
     * Edge case 2:
     * Clicking submit on an empty form should not call the success handler. Instead,
     * React Hook Form should populate errors for every required field.
     */
    const user = userEvent.setup()
    const onSuccessfulSubmit = vi.fn()
    render(<UserRegistrationForm submissionDelay={0} onSuccessfulSubmit={onSuccessfulSubmit} />)

    await user.click(screen.getByRole('button', { name: 'Create Account' }))

    /**
     * findByText waits for the first validation message to appear. After that,
     * the remaining messages should be present because all fields are invalid.
     */
    expect(await screen.findByText('Full name is required.')).toBeInTheDocument()
    expect(screen.getByText('Email address is required.')).toBeInTheDocument()
    expect(screen.getByText('Password is required.')).toBeInTheDocument()
    expect(screen.getByText('Please confirm your password.')).toBeInTheDocument()
    expect(screen.getByText('Choose a role.')).toBeInTheDocument()
    expect(screen.getByText('You must accept the terms and conditions.')).toBeInTheDocument()

    /**
     * This verifies validation actually blocked submission instead of merely
     * displaying warning text.
     */
    expect(onSuccessfulSubmit).not.toHaveBeenCalled()
  })

  it('edge: detects password mismatch and malformed cached drafts safely', async () => {
    /**
     * Edge case 3:
     * The component must handle bad cached JSON gracefully because localStorage is
     * outside React's control. A corrupted draft should not crash the page.
     */
    const user = userEvent.setup()
    window.localStorage.setItem(REGISTRATION_STORAGE_KEY, '{bad json')
    render(<UserRegistrationForm submissionDelay={0} />)

    /**
     * This interaction specifically tests the cross-field validation rule: confirm
     * password depends on the current password value watched by React Hook Form.
     */
    await user.type(screen.getByLabelText('Password'), 'Secure123')
    await user.type(screen.getByLabelText('Confirm Password'), 'Different123')
    await user.tab()

    expect(await screen.findByText('Passwords must match.')).toBeInTheDocument()
    expect(safeParseDraft('{bad json')).toBeNull()
  })

  it('edge: role metadata and submission summary remain predictable', () => {
    /**
     * Extra edge/contract coverage:
     * This protects small pieces of exported metadata that the component and guide
     * depend on. If the available roles or summary string changes accidentally,
     * this test catches the mismatch.
     */
    expect(roleOptions).toEqual(['Developer', 'Designer', 'Product Manager'])
    expect(createSubmissionSummary({ fullName: 'Mina Park', role: 'Designer', email: 'mina@example.com' })).toBe(
      'Mina Park registered as Designer with mina@example.com',
    )

    /**
     * A fully blank draft should not be written to localStorage. This protects the
     * cache cleanup behavior for reset and empty forms.
     */
    expect(hasDraftValues({ fullName: '', email: '', password: '', confirmPassword: '', role: '', terms: false })).toBe(false)
  })
})
