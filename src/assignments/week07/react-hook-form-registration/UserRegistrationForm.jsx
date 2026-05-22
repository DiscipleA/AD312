import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

/**
 * Week 7 Assignment 2: Building a User Registration Form with React Hook Form
 * --------------------------------------------------------------------------------
 * This file is intentionally written as a teaching artifact, not just a finished
 * component. The comments explain why React Hook Form is useful, how validation is
 * connected to individual fields, how draft caching works, and where performance
 * benefits come from.
 *
 * Big idea:
 * Traditional controlled React forms often store every keystroke in useState.
 * That works, but it can cause the whole component tree to re-render repeatedly
 * as forms get larger. React Hook Form uses mostly uncontrolled inputs and refs,
 * then subscribes only the pieces of state the UI needs, such as errors,
 * isSubmitting, and isValid.
 *
 * In this assignment, students should notice that there is no manual useState for
 * fullName, email, password, confirmPassword, role, or terms. The form library
 * owns the field values, and each input is connected through register().
 */

/**
 * localStorage key used by the draft-cache requirement.
 * Keeping the key in one exported constant prevents spelling mismatches between
 * the component, tests, and any future helper utilities.
 */
export const REGISTRATION_STORAGE_KEY = 'ad312-week07-registration-draft'

/**
 * The clean form state.
 * React Hook Form uses these values when the form first renders and again when
 * reset(defaultRegistrationValues) runs after a successful submission.
 */
export const defaultRegistrationValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: '',
  terms: false,
}

/**
 * Dropdown options are kept outside the component so the same data can be reused
 * by the JSX, tests, and documentation. This also makes the select menu easier to
 * update without digging through render logic.
 */
export const roleOptions = ['Developer', 'Designer', 'Product Manager']

/**
 * Email validation pattern.
 * This is intentionally stronger than just checking for "@". It requires:
 * - at least one non-space/non-@ character before @
 * - at least one non-space/non-@ character after @
 * - a dot followed by at least two non-space characters
 *
 * This is still not a perfect replacement for server-side validation, but it is
 * appropriate for client-side feedback in a registration form.
 */
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

/**
 * Password validation pattern.
 * The lookaheads mean:
 * - (?=.*[a-z]) requires at least one lowercase letter somewhere in the string
 * - (?=.*[A-Z]) requires at least one uppercase letter somewhere in the string
 * - (?=.*\d) requires at least one digit somewhere in the string
 * - .{8,} requires a minimum length of 8 characters
 */
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

/**
 * Small pure helper used by both the component and tests.
 * Pure helpers are easy to test because they do not depend on the DOM, React, or
 * localStorage. They also make the validation intent readable in the test file.
 */
export function isValidEmail(value) {
  // Convert missing values to an empty string so regex.test never receives null
  // or undefined. trim() prevents accidental leading/trailing spaces from making
  // an otherwise valid email fail in surprising ways.
  return emailPattern.test(String(value || '').trim())
}

export function isStrongPassword(value) {
  // Passwords should not be trimmed here because spaces may be intentional
  // characters. The pattern itself decides whether the full value is strong.
  return passwordPattern.test(String(value || ''))
}

export function passwordsMatch(password, confirmPassword) {
  // String conversion prevents undefined/null from crashing comparison logic.
  // This helper mirrors the confirm-password validation rule used by register().
  return String(password || '') === String(confirmPassword || '')
}

/**
 * Read a cached draft safely.
 * localStorage always stores strings, so the form must parse JSON before it can
 * restore values. Because users/devtools/tests can place invalid JSON in storage,
 * this helper catches parse failures and returns null instead of crashing the app.
 */
export function safeParseDraft(rawValue) {
  if (!rawValue) return null

  try {
    const parsed = JSON.parse(rawValue)

    return {
      // Start from defaults so a partial draft still has every form key.
      ...defaultRegistrationValues,
      // Then layer the saved values on top.
      ...parsed,
      // Checkbox values should always be booleans. JSON from storage could contain
      // truthy/falsy non-boolean values, so Boolean(...) normalizes the shape.
      terms: Boolean(parsed.terms),
    }
  } catch {
    // Invalid cache data should not block the registration page from loading.
    return null
  }
}

/**
 * Decide whether the current form values are worth saving.
 * If every field is empty/false, localStorage should be cleared so the next page
 * load starts from a clean form instead of restoring a meaningless blank draft.
 */
export function hasDraftValues(values) {
  return Boolean(
    values?.fullName ||
    values?.email ||
    values?.password ||
    values?.confirmPassword ||
    values?.role ||
    values?.terms
  )
}

/**
 * Submission summary helper.
 * This gives tests one predictable string to assert and models the kind of
 * confirmation payload a real API might return after successful registration.
 */
export function createSubmissionSummary(values) {
  return `${values.fullName} registered as ${values.role} with ${values.email}`
}

/**
 * Simulated async API call.
 * The assignment requires a loading/submitting state and a simulated network
 * delay. Keeping the delay in this helper makes tests fast because they can pass
 * submissionDelay={0}, while the real preview still demonstrates the lifecycle.
 */
export async function simulateRegistration(values, delay = 2000) {
  await new Promise((resolve) => setTimeout(resolve, delay))
  return {
    ok: true,
    message: createSubmissionSummary(values),
  }
}

export default function UserRegistrationForm({
  storageKey = REGISTRATION_STORAGE_KEY,
  submissionDelay = 2000,
  onSuccessfulSubmit,
}) {
  /**
   * loadedDraftRef prevents the caching effect from writing to localStorage before
   * the initial draft-load effect has had a chance to restore saved values.
   *
   * useRef is used instead of useState because changing this flag should not cause
   * a render. It is an internal lifecycle marker, not visual UI state.
   */
  const loadedDraftRef = useRef(false)

  /**
   * skipNextCacheWriteRef prevents an immediate blank draft write after reset().
   * After a successful submission, reset() changes watched values back to defaults.
   * Without this guard, the watch effect could react to that reset and write an
   * unnecessary empty object back into localStorage right after we clear it.
   */
  const skipNextCacheWriteRef = useRef(false)

  /**
   * useForm is the central React Hook Form API.
   *
   * register:
   *   Connects an input/select/checkbox to React Hook Form. It returns the ref,
   *   name, onChange, and onBlur handlers needed by the library, so we do not write
   *   manual useState handlers for each field.
   *
   * handleSubmit:
   *   Runs validation first. If all rules pass, it calls onSubmit(values). If any
   *   rule fails, React Hook Form populates formState.errors and blocks submission.
   *
   * watch:
   *   Subscribes to field values. We use it for two reasons: password matching and
   *   draft caching. This is different from storing every field in component state.
   *
   * setValue:
   *   Allows the component to load values from localStorage after mount while still
   *   letting React Hook Form own the fields.
   *
   * reset:
   *   Returns the form to clean default values after successful registration.
   *
   * formState:
   *   Provides subscribed UI state. errors renders validation messages, isSubmitting
   *   drives the loading label, and isValid lets the footer show readiness.
   */
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    // onChange gives real-time validation feedback as the user types/selects.
    mode: 'onChange',
    defaultValues: defaultRegistrationValues,
  })

  /**
   * passwordValue watches only the password field. The confirm-password validator
   * uses this value to compare against the current confirmPassword input.
   */
  const passwordValue = watch('password')

  /**
   * watchedValues subscribes to the full form. This powers draft caching. React
   * Hook Form still avoids the manual "one useState per input" architecture.
   */
  const watchedValues = watch()

  /**
   * Mount effect: restore a cached draft from localStorage.
   *
   * This satisfies the assignment's lifecycle requirement to load data
   * asynchronously/after mount with setValue. Each restored field is pushed into
   * React Hook Form through setValue so validation and form state stay consistent.
   */
  useEffect(() => {
    const cachedDraft = safeParseDraft(window.localStorage.getItem(storageKey))

    if (cachedDraft) {
      Object.entries(cachedDraft).forEach(([fieldName, fieldValue]) => {
        setValue(fieldName, fieldValue, {
          // Re-run validation so restored drafts immediately show whether they are
          // valid. This matters for fields like email, password, role, and terms.
          shouldValidate: true,
          // Loading a saved draft should not be treated as a new user edit.
          shouldDirty: false,
        })
      })
    }

    loadedDraftRef.current = true
  }, [setValue, storageKey])

  /**
   * Watch effect: keep localStorage synchronized with the current draft.
   *
   * The dependency on watchedValues means the effect runs when form values change.
   * This demonstrates React Hook Form's watch mechanism while keeping validation
   * and field registration inside the form library instead of manual useState.
   */
  useEffect(() => {
    if (!loadedDraftRef.current) return

    if (skipNextCacheWriteRef.current) {
      skipNextCacheWriteRef.current = false
      return
    }

    if (hasDraftValues(watchedValues)) {
      window.localStorage.setItem(storageKey, JSON.stringify(watchedValues))
    } else {
      window.localStorage.removeItem(storageKey)
    }
  }, [storageKey, watchedValues])

  /**
   * Submit handler.
   * handleSubmit(onSubmit) guarantees this function only receives validated data.
   * It simulates a server request, clears the draft cache, resets the form, and
   * optionally notifies tests/parent components through onSuccessfulSubmit.
   */
  async function onSubmit(values) {
    const result = await simulateRegistration(values, submissionDelay)
    window.localStorage.removeItem(storageKey)
    skipNextCacheWriteRef.current = true
    reset(defaultRegistrationValues)
    onSuccessfulSubmit?.(result)
  }

  return (
    <section className="hook-form-preview-card" aria-label="User registration preview">
      <div className="hook-form-preview-header">
        <p className="hook-form-kicker">Working Preview</p>
        <h2>User Registration Form</h2>
        <p>
          This preview uses React Hook Form registration instead of manually controlling every input with
          component state. Validation is declared inside each field registration rule.
        </p>
      </div>

      {isSubmitting ? (
        <div className="hook-form-loading-banner" role="status">
          Registering... simulating a network request
        </div>
      ) : null}

      {/*
        noValidate disables the browser's native validation bubbles so the lesson
        focuses on React Hook Form's validation messages and error state.
      */}
      <form className="hook-form-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="fullName">
          Full Name
          <input
            id="fullName"
            autoFocus
            aria-invalid={errors.fullName ? 'true' : 'false'}
            {...register('fullName', {
              // Required + minLength meet the Full Name validation requirement.
              required: 'Full name is required.',
              minLength: { value: 3, message: 'Full name must be at least 3 characters.' },
            })}
          />
          <span className="hook-form-error-layer">{errors.fullName?.message}</span>
        </label>

        <label htmlFor="email">
          Email Address
          <input
            id="email"
            type="email"
            aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email', {
              // React Hook Form owns the validation rule. We do not manually parse
              // the email in an onChange handler.
              required: 'Email address is required.',
              pattern: { value: emailPattern, message: 'Enter a valid email address.' },
            })}
          />
          <span className="hook-form-error-layer">{errors.email?.message}</span>
        </label>

        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            aria-invalid={errors.password ? 'true' : 'false'}
            {...register('password', {
              // The pattern rule enforces all high-security criteria in one place:
              // length, uppercase, lowercase, and number.
              required: 'Password is required.',
              pattern: {
                value: passwordPattern,
                message: 'Use at least 8 characters with uppercase, lowercase, and a number.',
              },
            })}
          />
          <span className="hook-form-error-layer">{errors.password?.message}</span>
        </label>

        <label htmlFor="confirmPassword">
          Confirm Password
          <input
            id="confirmPassword"
            type="password"
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            {...register('confirmPassword', {
              required: 'Please confirm your password.',
              // validate can be a custom function. It returns true for valid data
              // or a string error message when the rule fails.
              validate: (value) => passwordsMatch(passwordValue, value) || 'Passwords must match.',
            })}
          />
          <span className="hook-form-error-layer">{errors.confirmPassword?.message}</span>
        </label>

        <label htmlFor="role">
          Role / Account Type
          <select
            id="role"
            aria-invalid={errors.role ? 'true' : 'false'}
            {...register('role', { required: 'Choose a role.' })}
          >
            {/* Empty string keeps the placeholder invalid until a real role is selected. */}
            <option value="">Select a role...</option>
            {roleOptions.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <span className="hook-form-error-layer">{errors.role?.message}</span>
        </label>

        <label className="hook-form-checkbox-row" htmlFor="terms">
          <input
            id="terms"
            type="checkbox"
            aria-invalid={errors.terms ? 'true' : 'false'}
            {...register('terms', { required: 'You must accept the terms and conditions.' })}
          />
          I agree to the Terms & Conditions
          <span className="hook-form-error-layer">{errors.terms?.message}</span>
        </label>

        <div className="hook-form-footer-row">
          {/* isSubmitting comes from React Hook Form, so the button state follows
              the async lifecycle without separate loading useState. */}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Create Account'}
          </button>
          <span>{isValid ? 'Form is valid and ready.' : 'Complete every validation rule.'}</span>
        </div>
      </form>
    </section>
  )
}
