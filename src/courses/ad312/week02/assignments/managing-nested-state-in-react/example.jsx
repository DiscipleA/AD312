import { useState } from 'react'

export default function NestedStateMirrorExample() {
  const [profile, setProfile] = useState({
    name: 'Jordan Lee',
    address: {
      city: 'Component City',
      country: 'Frontendland',
    },
  })

  function updateCity() {
    setProfile((currentProfile) => ({
      ...currentProfile,
      address: {
        ...currentProfile.address,
        city: 'Hooks Harbor',
      },
    }))
  }

  return (
    <div className="lesson-example">
      <h3>Nested State</h3>
      <p>{profile.name}</p>
      <p>
        {profile.address.city}, {profile.address.country}
      </p>
      <button onClick={updateCity}>Change city</button>
    </div>
  )
}
