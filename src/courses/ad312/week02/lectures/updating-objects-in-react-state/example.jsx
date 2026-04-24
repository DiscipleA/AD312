import { useState } from 'react'

export default function UpdatingObjectsExample() {
  const [person, setPerson] = useState({
    name: 'Jordan Lee',
    role: 'Frontend Developer',
  })

  function renamePerson() {
    setPerson((currentPerson) => ({
      ...currentPerson,
      name: 'Jordan Avery Lee',
    }))
  }

  return (
    <div className="lesson-example">
      <h3>Object Update Example</h3>
      <p>Name: {person.name}</p>
      <p>Role: {person.role}</p>
      <button onClick={renamePerson}>Update name</button>
    </div>
  )
}
