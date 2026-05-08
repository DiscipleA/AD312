import { useMemo } from 'react'
import { useImmer } from 'use-immer'
import '../../../styles/week03-user-profile-immer-assignment.css'

export const initialUserProfile = {
  name: 'Jordan Lee',
  email: 'jordan.lee@example.com',
  contactDetails: {
    phone: '555-0101',
    address: '123 React Lane, Component City',
  },
  preferences: {
    newsletter: true,
    notifications: true,
  },
}

export default function UserProfileWithImmer() {
  const [userProfile, updateUserProfile] = useImmer(initialUserProfile)

  function handleNameChange(event) {
    const nextName = event.target.value

    updateUserProfile((draft) => {
      draft.name = nextName
    })
  }

  function updateContactDetails(nextPhone, nextAddress) {
    updateUserProfile((draft) => {
      draft.contactDetails.phone = nextPhone
      draft.contactDetails.address = nextAddress
    })
  }

  function handlePhoneChange(event) {
    updateContactDetails(event.target.value, userProfile.contactDetails.address)
  }

  function handleAddressChange(event) {
    updateContactDetails(userProfile.contactDetails.phone, event.target.value)
  }

  function toggleNewsletterSubscription() {
    updateUserProfile((draft) => {
      draft.preferences.newsletter = !draft.preferences.newsletter
    })
  }

  const profileSummary = useMemo(() => {
    const newsletterLabel = userProfile.preferences.newsletter ? 'Subscribed' : 'Not Subscribed'
    const notificationsLabel = userProfile.preferences.notifications ? 'Notifications On' : 'Notifications Off'

    return `${userProfile.name} • ${userProfile.contactDetails.phone} • ${newsletterLabel} • ${notificationsLabel}`
  }, [userProfile])

  return (
    <section className="user-profile-immer-shell">
      <div className="user-profile-immer-card">
        <div className="user-profile-immer-hero">
          <div>
            <p className="user-profile-immer-kicker">Standalone Exercise</p>
            <h2>User Profile with useImmer</h2>
            <p className="user-profile-immer-intro">
              This exercise demonstrates how the <code>useImmer</code> Hook makes nested state
              updates easier to read. Instead of rebuilding every level with many spread operators,
              you update a draft object and let Immer safely produce the next immutable snapshot.
            </p>
          </div>

          <div className="user-profile-immer-summary-grid">
            <div className="user-profile-immer-summary-card">
              <span>Profile</span>
              <strong data-testid="summary-name">{userProfile.name || '—'}</strong>
            </div>
            <div className="user-profile-immer-summary-card">
              <span>Newsletter</span>
              <strong data-testid="summary-newsletter">
                {userProfile.preferences.newsletter ? 'Subscribed' : 'Paused'}
              </strong>
            </div>
            <div className="user-profile-immer-summary-card">
              <span>Notifications</span>
              <strong data-testid="summary-notifications">
                {userProfile.preferences.notifications ? 'On' : 'Off'}
              </strong>
            </div>
          </div>
        </div>

        <div className="user-profile-immer-form-grid">
          <label className="user-profile-immer-field">
            <span>Name</span>
            <input
              data-testid="name-input"
              type="text"
              value={userProfile.name}
              onChange={handleNameChange}
              placeholder="Enter a name"
            />
          </label>

          <label className="user-profile-immer-field">
            <span>Phone</span>
            <input
              data-testid="phone-input"
              type="text"
              value={userProfile.contactDetails.phone}
              onChange={handlePhoneChange}
              placeholder="Enter a phone number"
            />
          </label>

          <label className="user-profile-immer-field user-profile-immer-field-wide">
            <span>Address</span>
            <input
              data-testid="address-input"
              type="text"
              value={userProfile.contactDetails.address}
              onChange={handleAddressChange}
              placeholder="Enter a mailing address"
            />
          </label>
        </div>

        <div className="user-profile-immer-action-row">
          <label className="user-profile-immer-checkbox">
            <input
              data-testid="newsletter-checkbox"
              type="checkbox"
              checked={userProfile.preferences.newsletter}
              onChange={toggleNewsletterSubscription}
            />
            <span>Receive newsletter updates</span>
          </label>
        </div>

        <div className="user-profile-immer-preview-grid">
          <div className="user-profile-immer-preview-card">
            <h3>Rendered Profile</h3>
            <ul className="user-profile-immer-list">
              <li data-testid="profile-name"><strong>Name:</strong> {userProfile.name}</li>
              <li data-testid="profile-email"><strong>Email:</strong> {userProfile.email}</li>
              <li data-testid="profile-phone"><strong>Phone:</strong> {userProfile.contactDetails.phone}</li>
              <li data-testid="profile-address"><strong>Address:</strong> {userProfile.contactDetails.address}</li>
              <li data-testid="profile-newsletter">
                <strong>Newsletter:</strong> {userProfile.preferences.newsletter ? 'Subscribed' : 'Not Subscribed'}
              </li>
              <li data-testid="profile-notifications">
                <strong>Notifications:</strong> {userProfile.preferences.notifications ? 'Enabled' : 'Disabled'}
              </li>
            </ul>
          </div>

          <div className="user-profile-immer-preview-card">
            <h3>Readable Summary</h3>
            <p data-testid="profile-summary">{profileSummary}</p>
            <p className="user-profile-immer-tip">
              Notice that changing <code>phone</code> or <code>address</code> does not require a
              manual rebuild of the full <code>userProfile</code> object. Immer lets the code focus
              on the specific field that changed.
            </p>
          </div>
        </div>

        <div className="user-profile-immer-json-card">
          <h3>Live State Output</h3>
          <pre data-testid="profile-json">{JSON.stringify(userProfile, null, 2)}</pre>
        </div>
      </div>
    </section>
  )
}
