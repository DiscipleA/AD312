import UserProfile from '../../../exercises/UserProfile'
import NestedStateTestPanel from './NestedStateTestPanel'
import '../../../styles/week02-managing-nested-state-assignment.css'
import CodeBlock from '../../../components/CodeBlock'
import { annotateDisplayedCode } from '../../../utils/educationalCode'

const userProfileSyntax = `import { useState } from 'react'
import '../styles/week02-managing-nested-state-assignment.css'

const initialUserProfile = {
  name: 'Jordan Lee',
  email: 'jordan.lee@example.com',
  address: {
    street: '123 React Lane',
    city: 'Component City',
    country: 'Frontendland',
  },
}

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(initialUserProfile)
  const [streetInput, setStreetInput] = useState(initialUserProfile.address.street)
  const [cityInput, setCityInput] = useState(initialUserProfile.address.city)
  const [countryInput, setCountryInput] = useState(initialUserProfile.address.country)

  function updateAddress(street, city, country) {
    setUserProfile((currentProfile) => ({
      ...currentProfile,
      address: {
        ...currentProfile.address,
        street,
        city,
        country,
      },
    }))
  }

  function handleApplyAddress() {
    updateAddress(streetInput, cityInput, countryInput)
  }

  return (
    <section>
      <input value={streetInput} onChange={(event) => setStreetInput(event.target.value)} />
      <input value={cityInput} onChange={(event) => setCityInput(event.target.value)} />
      <input value={countryInput} onChange={(event) => setCountryInput(event.target.value)} />
      <button type="button" onClick={handleApplyAddress}>Update Address</button>

      <p>{userProfile.name}</p>
      <p>{userProfile.email}</p>
      <p>{userProfile.address.street}</p>
      <p>{userProfile.address.city}</p>
      <p>{userProfile.address.country}</p>
    </section>
  )
}`

const testSyntax = `import { cleanup, fireEvent, render, screen } from '@testing-library/react'
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
  })
})`

export default function Week02ManagingNestedStateAssignmentGuide() {
  return (
    <div className="assignment-guide-shell">
      <div className="assignment-hero">
        <p className="assignment-kicker">Week 2 Assignment</p>
        <h1>Managing Nested State in React</h1>
        <p className="assignment-summary">
          Build a standalone user profile component that updates nested address fields
          immutably. This assignment extends the Week 2 object-state lecture by showing
          how to preserve top-level profile data while safely replacing nested values.
        </p>
      </div>

      <section className="assignment-section">
        <h2>Overview</h2>
        <p>
          This assignment focuses on a common React challenge: updating a nested object in
          state without mutating the original state tree. Instead of storing a single
          number or string, you will manage a <code>userProfile</code> object that contains
          both top-level identity fields and a nested <code>address</code> object.
        </p>
        <p>
          Your goal is to let the learner edit street, city, and country through input
          fields, then apply those values with an immutable update. The UI should make it
          obvious that the address changes while the rest of the profile remains stable.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Learning Objectives</h2>
        <ul>
          <li>Create a React state object with nested properties.</li>
          <li>Use a functional state setter to update state predictably.</li>
          <li>Spread both the parent object and the nested object to preserve immutability.</li>
          <li>Render controlled inputs that feed nested state updates.</li>
          <li>Write automated tests that cover normal flows and edge cases.</li>
        </ul>
      </section>

      <section className="assignment-section">
        <h2>Build Strategy</h2>

        <h3>Step 1: Create the standalone exercise component</h3>
        <p>
          Create <code>src/exercises/UserProfile.jsx</code>. Keep it standalone-capable so
          it can be rendered independently in a plain Vite project while still fitting into
          the larger course platform.
        </p>

        <h3>Step 2: Initialize nested state</h3>
        <p>
          Start with a <code>userProfile</code> object that includes <code>name</code>,
          <code>email</code>, and an <code>address</code> object with
          <code>street</code>, <code>city</code>, and <code>country</code>. This gives you
          a realistic example of nested state.
        </p>

        <h3>Step 3: Keep form inputs controlled</h3>
        <p>
          Store the current form values in local input state so that learners can type
          before applying the address update. Controlled inputs make the update path easier
          to follow and test.
        </p>

        <h3>Step 4: Write updateAddress carefully</h3>
        <p>
          The important part is the update function. Spread the existing profile with
          <code>...currentProfile</code>, then spread the existing nested address with
          <code>...currentProfile.address</code>, and finally replace the street, city, and
          country fields. This preserves immutability at both levels.
        </p>

        <h3>Step 5: Render the updated profile clearly</h3>
        <p>
          Display the current profile values below the form so that every click on
          <code>Update Address</code> immediately demonstrates the result of the nested
          state change.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Conceptual Explanation</h2>
        <p>
          When React state contains objects, a shallow replacement only updates the level
          you explicitly recreate. If you directly mutate <code>userProfile.address.street</code>,
          you are changing existing state in place, which breaks React's immutable update
          model and can lead to confusing bugs.
        </p>
        <p>
          By contrast, spreading the parent and nested objects creates a new state shape.
          React can then compare references correctly, recognize the update, and re-render
          the component with confidence.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Data Structure and State Logic</h2>
        <p>
          The exercise is intentionally small but structurally important. You are managing
          one parent object with two responsibilities:
        </p>
        <ul>
          <li>Stable identity information at the top level.</li>
          <li>Nested address details that change through user interaction.</li>
        </ul>
        <p>
          This makes the assignment a good bridge between simple counters and larger forms,
          dashboards, or task tools where nested updates are common.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Working Exercise Preview</h2>
        <p>
          The preview below is the same standalone exercise component that the tests target.
          It lives separately from the guide so the exercise, guide, and tests stay cleanly
          layered.
        </p>
        <UserProfile />
      </section>

      <section className="assignment-section">
        <h2>Full Syntax</h2>
        <CodeBlock
          code={annotateDisplayedCode(userProfileSyntax, 'react')}
          language="jsx"
          label="Component"
        />
      </section>

      <section className="assignment-section">
        <h2>Automated Test Syntax</h2>
        <p>
          The official Vitest suite includes at least three normal-flow checks and three
          edge-case checks, matching the assignment requirement.
        </p>
        <CodeBlock
          code={annotateDisplayedCode(testSyntax, 'test')}
          language="test"
          label="Vitest"
        />
      </section>

      <section className="assignment-section">
        <h2>Manual Verification Checklist</h2>
        <ol>
          <li>Confirm the default profile values render on first load.</li>
          <li>Enter a new street, city, and country, then click <code>Update Address</code>.</li>
          <li>Verify that only the nested address fields change.</li>
          <li>Confirm the name and email remain unchanged.</li>
          <li>Try blank values and repeated updates to confirm stable behavior.</li>
        </ol>
      </section>

      <section className="assignment-section">
        <h2>How to Run the Tests</h2>
        <ol>
          <li>Run <code>npm install</code> if dependencies are not already installed.</li>
          <li>Run <code>npm run dev</code> to inspect the assignment in the app shell.</li>
          <li>Run <code>npx vitest run src/exercises/UserProfile.test.jsx</code> to execute the official tests.</li>
        </ol>
      </section>

      <section className="assignment-section">
        <h2>Common Mistakes to Avoid</h2>
        <ul>
          <li>Mutating <code>userProfile.address</code> directly instead of creating a new object.</li>
          <li>Forgetting to spread the parent object before replacing the nested address.</li>
          <li>Using uncontrolled inputs that make updates harder to reason about.</li>
          <li>Updating the address but forgetting to display the changed values in the UI.</li>
        </ul>
      </section>

      <section className="assignment-section">
        <h2>Student Takeaways</h2>
        <p>
          After completing this assignment, learners should understand that nested state
          updates are not fundamentally different from simple state updates—they just
          require care at each level of the data structure. This pattern will keep showing
          up in forms, dashboards, profile editors, task tools, and any React interface
          that manages structured data.
        </p>
      </section>

      <NestedStateTestPanel />
    </div>
  )
}
