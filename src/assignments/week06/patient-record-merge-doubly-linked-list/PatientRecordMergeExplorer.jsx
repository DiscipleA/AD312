import { useMemo, useState } from 'react'
import {
  createPatientList,
  hasValidPrevLinks,
  listToDisplayStrings,
  mergeLists,
} from './PatientRecordMerge'
import '../../../styles/week06-patient-record-merge-assignment.css'

const presets = [
  {
    label: 'One record from each provider',
    healthMerge: '10-Alice-30',
    carePlus: '20-Bob-25',
  },
  {
    label: 'Duplicate SSN preserved',
    healthMerge: '10-Alice-30',
    carePlus: '10-Alex-22',
  },
  {
    label: 'CarePlus record goes in the middle',
    healthMerge: '10-Alice-30; 30-Bob-25',
    carePlus: '20-Alex-22',
  },
  {
    label: 'HealthMerge list is empty',
    healthMerge: '',
    carePlus: '10-Alice-30',
  },
]

function parsePatientRecords(input) {
  return input
    .split(';')
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [ssnText, nameText, ageText] = chunk.split('-').map((part) => part.trim())
      const ssn = Number(ssnText)
      const age = Number(ageText)

      if (!Number.isFinite(ssn) || !Number.isFinite(age) || !nameText) {
        return null
      }

      return { ssn, age, name: nameText }
    })
    .filter(Boolean)
}

function isSortedBySsn(records) {
  return records.every((record, index, array) => index === 0 || array[index - 1].ssn <= record.ssn)
}

function formatRecords(records) {
  if (!records.length) return 'empty list'
  return records.map((record) => `${record.ssn}-${record.name}-${record.age}`).join(' → ')
}

export default function PatientRecordMergeExplorer() {
  const [healthMergeInput, setHealthMergeInput] = useState('10-Alice-30; 30-Bob-25')
  const [carePlusInput, setCarePlusInput] = useState('20-Alex-22')

  const healthMergeRecords = useMemo(() => parsePatientRecords(healthMergeInput), [healthMergeInput])
  const carePlusRecords = useMemo(() => parsePatientRecords(carePlusInput), [carePlusInput])

  const preview = useMemo(() => {
    const healthMergeHead = createPatientList(healthMergeRecords)
    const carePlusHead = createPatientList(carePlusRecords)
    const mergedHead = mergeLists(healthMergeHead, carePlusHead)

    return {
      mergedRecords: listToDisplayStrings(mergedHead),
      prevLinksValid: hasValidPrevLinks(mergedHead),
      healthMergeSorted: isSortedBySsn(healthMergeRecords),
      carePlusSorted: isSortedBySsn(carePlusRecords),
    }
  }, [healthMergeRecords, carePlusRecords])

  const inputsReady = preview.healthMergeSorted && preview.carePlusSorted

  return (
    <section className="patient-merge-preview-card">
      <div className="patient-merge-preview-header">
        <p className="patient-merge-kicker">Working Preview</p>
        <h3>Patient Record Merge Preview</h3>
        <p>
          Enter each provider list as semicolon-separated records in <code>SSN-Name-Age</code> format.
          The preview builds two sorted doubly linked lists, merges the existing nodes by SSN, and checks
          that the merged list still has valid backward <code>prev</code> links.
        </p>
      </div>

      <div className="patient-merge-input-grid">
        <label className="patient-merge-input-label" htmlFor="healthmerge-record-input">
          HealthMerge records
          <input
            id="healthmerge-record-input"
            value={healthMergeInput}
            onChange={(event) => setHealthMergeInput(event.target.value)}
            placeholder="10-Alice-30; 30-Bob-25"
          />
        </label>

        <label className="patient-merge-input-label" htmlFor="careplus-record-input">
          CarePlus records
          <input
            id="careplus-record-input"
            value={carePlusInput}
            onChange={(event) => setCarePlusInput(event.target.value)}
            placeholder="20-Alex-22"
          />
        </label>
      </div>

      <div className="patient-merge-preset-row">
        {presets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              setHealthMergeInput(preset.healthMerge)
              setCarePlusInput(preset.carePlus)
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="patient-merge-result-grid">
        <article>
          <span>HealthMerge List</span>
          <strong>{formatRecords(healthMergeRecords)}</strong>
        </article>
        <article>
          <span>CarePlus List</span>
          <strong>{formatRecords(carePlusRecords)}</strong>
        </article>
        <article className={inputsReady ? 'patient-merge-pass' : 'patient-merge-warn'}>
          <span>Input Order</span>
          <strong>{inputsReady ? 'Both lists are sorted by SSN' : 'Sort each provider list by SSN first'}</strong>
        </article>
        <article className={preview.prevLinksValid ? 'patient-merge-pass' : 'patient-merge-warn'}>
          <span>Merged Output</span>
          <strong>{preview.mergedRecords.length ? preview.mergedRecords.join(' → ') : 'empty list'}</strong>
        </article>
        <article className={preview.prevLinksValid ? 'patient-merge-pass' : 'patient-merge-warn'}>
          <span>Backward Links</span>
          <strong>{preview.prevLinksValid ? 'prev links are valid' : 'prev links need attention'}</strong>
        </article>
        <article>
          <span>Complexity</span>
          <strong>O(m + n) time • O(1) extra space</strong>
        </article>
      </div>
    </section>
  )
}
