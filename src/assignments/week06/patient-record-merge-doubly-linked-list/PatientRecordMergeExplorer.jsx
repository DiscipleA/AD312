import { useMemo, useState } from 'react'
import {
  createPatientList,
  hasValidPrevLinks,
  listToDisplayStrings,
  mergeLists,
} from './PatientRecordMerge'
import '../../../styles/week06-patient-record-merge-assignment.css'

const exampleInputs = {
  healthMerge: '10-Alice-30; 30-Bob-25; 50-Carla-41',
  carePlus: '20-Alex-22; 40-Dina-36',
}

function parsePatientRecords(input) {
  const invalidChunks = []
  const records = input
    .split(';')
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [ssnText, nameText, ageText] = chunk.split('-').map((part) => part.trim())
      const ssn = Number(ssnText)
      const age = Number(ageText)

      if (!Number.isFinite(ssn) || !Number.isFinite(age) || !nameText) {
        invalidChunks.push(chunk)
        return null
      }

      return { ssn, age, name: nameText }
    })
    .filter(Boolean)

  return { records, invalidChunks }
}

function isSortedBySsn(records) {
  return records.every((record, index, array) => index === 0 || array[index - 1].ssn <= record.ssn)
}

function formatRecords(records) {
  if (!records.length) return 'empty list'
  return records.map((record) => `${record.ssn}-${record.name}-${record.age}`).join(' → ')
}

export default function PatientRecordMergeExplorer() {
  const [draftHealthMergeInput, setDraftHealthMergeInput] = useState(exampleInputs.healthMerge)
  const [draftCarePlusInput, setDraftCarePlusInput] = useState(exampleInputs.carePlus)
  const [submittedInputs, setSubmittedInputs] = useState(exampleInputs)
  const [lastAction, setLastAction] = useState('Example list merge loaded')

  const healthMergeParse = useMemo(
    () => parsePatientRecords(submittedInputs.healthMerge),
    [submittedInputs.healthMerge],
  )
  const carePlusParse = useMemo(
    () => parsePatientRecords(submittedInputs.carePlus),
    [submittedInputs.carePlus],
  )

  const healthMergeRecords = healthMergeParse.records
  const carePlusRecords = carePlusParse.records

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

  const invalidInputCount = healthMergeParse.invalidChunks.length + carePlusParse.invalidChunks.length
  const inputsReady = preview.healthMergeSorted && preview.carePlusSorted && invalidInputCount === 0

  function runListMerge() {
    setSubmittedInputs({
      healthMerge: draftHealthMergeInput,
      carePlus: draftCarePlusInput,
    })
    setLastAction('List merge tested from current entries')
  }

  function resetExampleLists() {
    setDraftHealthMergeInput(exampleInputs.healthMerge)
    setDraftCarePlusInput(exampleInputs.carePlus)
    setSubmittedInputs(exampleInputs)
    setLastAction('Example list merge loaded')
  }

  return (
    <section className="patient-merge-preview-card">
      <div className="patient-merge-preview-header">
        <p className="patient-merge-kicker">Working Preview</p>
        <h3>Patient Record Merge Preview</h3>
        <p>
          Enter or edit each provider list as semicolon-separated records in <code>SSN-Name-Age</code> format.
          The preview builds two sorted doubly linked lists, merges the existing nodes by SSN, and checks
          that the merged list still has valid backward <code>prev</code> links.
        </p>
      </div>

      <div className="patient-merge-input-grid">
        <label className="patient-merge-input-label" htmlFor="healthmerge-record-input">
          HealthMerge records
          <input
            id="healthmerge-record-input"
            value={draftHealthMergeInput}
            onChange={(event) => setDraftHealthMergeInput(event.target.value)}
            placeholder="10-Alice-30; 30-Bob-25; 50-Carla-41"
          />
        </label>

        <label className="patient-merge-input-label" htmlFor="careplus-record-input">
          CarePlus records
          <input
            id="careplus-record-input"
            value={draftCarePlusInput}
            onChange={(event) => setDraftCarePlusInput(event.target.value)}
            placeholder="20-Alex-22; 40-Dina-36"
          />
        </label>
      </div>

      <div className="patient-merge-custom-actions" aria-label="List merge controls">
        <button type="button" className="patient-merge-primary-action" onClick={runListMerge}>
          Run List Merge
        </button>
        <button type="button" className="patient-merge-secondary-action" onClick={resetExampleLists}>
          Reset Example Lists
        </button>
        <span className="patient-merge-action-note">{lastAction}</span>
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
          <strong>{inputsReady ? 'Both lists are sorted by SSN' : 'Check format and sort each provider list by SSN first'}</strong>
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
