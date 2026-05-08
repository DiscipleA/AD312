import { useMemo, useState } from 'react'
import '../../../styles/week02-managing-nested-state-assignment.css'

export const initialUserProfile = {
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

  const profileSummary = useMemo(() => {
    return `${userProfile.address.street}, ${userProfile.address.city}, ${userProfile.address.country}`
  }, [userProfile])

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
    <section className="nested-profile-shell">
      <div className="nested-profile-card">
        <p className="nested-profile-kicker">Week 2 Assignment Exercise</p>
        <h2>Managing Nested State in React</h2>
        <p className="nested-profile-description">
          Practice immutable updates by editing a nested address object inside a larger
          user profile. The top-level profile data remains intact while the nested
          address fields are updated with a functional state setter.
        </p>

        <div className="nested-profile-layout">
          <div className="nested-profile-form">
            <label className="nested-profile-field">
              <span>Street</span>
              <input
                value={streetInput}
                onChange={(event) => setStreetInput(event.target.value)}
                placeholder="Enter street"
                data-testid="street-input"
              />
            </label>

            <label className="nested-profile-field">
              <span>City</span>
              <input
                value={cityInput}
                onChange={(event) => setCityInput(event.target.value)}
                placeholder="Enter city"
                data-testid="city-input"
              />
            </label>

            <label className="nested-profile-field">
              <span>Country</span>
              <input
                value={countryInput}
                onChange={(event) => setCountryInput(event.target.value)}
                placeholder="Enter country"
                data-testid="country-input"
              />
            </label>

            <button
              type="button"
              className="nested-profile-button"
              onClick={handleApplyAddress}
            >
              Update Address
            </button>

            <div className="nested-profile-tipbox">
              <h3>Why this matters</h3>
              <ul>
                <li>React state should be treated as immutable.</li>
                <li>Nested updates require spreading both the parent object and the nested object.</li>
                <li>Using the functional setter form keeps updates reliable and predictable.</li>
              </ul>
            </div>
          </div>

          <div className="nested-profile-preview">
            <p className="nested-profile-preview-label">Current profile snapshot</p>
            <div className="nested-profile-summary-badge" data-testid="profile-summary">
              {profileSummary}
            </div>

            <div className="nested-profile-details">
              <div className="nested-profile-row">
                <span>Name</span>
                <strong data-testid="profile-name">{userProfile.name}</strong>
              </div>
              <div className="nested-profile-row">
                <span>Email</span>
                <strong data-testid="profile-email">{userProfile.email}</strong>
              </div>
              <div className="nested-profile-row">
                <span>Street</span>
                <strong data-testid="profile-street">{userProfile.address.street}</strong>
              </div>
              <div className="nested-profile-row">
                <span>City</span>
                <strong data-testid="profile-city">{userProfile.address.city}</strong>
              </div>
              <div className="nested-profile-row">
                <span>Country</span>
                <strong data-testid="profile-country">{userProfile.address.country}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
