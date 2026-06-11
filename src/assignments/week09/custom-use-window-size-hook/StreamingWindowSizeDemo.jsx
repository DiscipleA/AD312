import { useEffect, useMemo, useState } from 'react'
import { buildStreamingLayoutProfile, useWindowSize } from './useWindowSize'

// These presets are part of the GUI demonstration, not part of the hook itself.
// The real hook always reads the real browser window. The presets simply let a
// student click common viewport sizes and see how a streaming layout would react
// without manually resizing the entire browser for every test case.
const previewPresets = [
  {
    id: 'live',
    label: 'Use live browser',
    width: null,
    height: null,
    note: 'Matches the real browser window reported by the hook.',
  },
  {
    id: 'phone',
    label: 'Phone 390px',
    width: 390,
    height: 844,
    note: 'Compact streaming layout with stacked content and larger tap targets.',
  },
  {
    id: 'tablet',
    label: 'Tablet 820px',
    width: 820,
    height: 720,
    note: 'Crosses the breakpoint and demonstrates the full layout rule.',
  },
  {
    id: 'laptop',
    label: 'Laptop 1280px',
    width: 1280,
    height: 800,
    note: 'Shows the wider desktop-style viewing experience.',
  },
]

export default function StreamingWindowSizeDemo() {
  // This is the central assignment behavior: the component consumes the reusable
  // custom hook instead of writing its own resize listener. If another component
  // needed width/height later, it could import useWindowSize() too, which prevents
  // duplicated event-listener code across the streaming site.
  const liveSize = useWindowSize()

  // selectedPresetId controls which preview mode the GUI should show. It begins
  // with "live" so the first render demonstrates the actual hook value. Button
  // clicks can then switch the visual simulator to phone, tablet, laptop, or a
  // custom slider width for easier manual testing.
  const [selectedPresetId, setSelectedPresetId] = useState('live')

  // simulatedWidth only affects the visual preview. It does not change what the
  // hook reads from the browser. This separation is intentional: the assignment
  // can prove that the hook is live while still giving the student a controlled
  // way to demonstrate different responsive states inside the portfolio page.
  const [simulatedWidth, setSimulatedWidth] = useState(liveSize.width)

  const selectedPreset = previewPresets.find((preset) => preset.id === selectedPresetId) ?? previewPresets[0]

  useEffect(() => {
    // When the user chooses "Use live browser," the simulator should keep following
    // the real hook value. This effect copies the hook's current width into the
    // simulated width only in live mode. If the user chose phone/tablet/laptop/custom,
    // their selected demonstration width should stay stable while the browser changes.
    if (selectedPresetId === 'live') {
      setSimulatedWidth(liveSize.width)
    }
  }, [liveSize.width, selectedPresetId])

  const previewSize = useMemo(() => {
    // useMemo is used here for clarity: previewSize is derived from the live hook
    // value plus the selected simulator controls. The memoized object is recalculated
    // only when one of those inputs changes, which keeps the render logic easy to
    // follow and avoids rebuilding the object for unrelated state updates.
    if (selectedPresetId === 'live') {
      return liveSize
    }

    return {
      width: simulatedWidth,
      height: selectedPreset.height ?? liveSize.height,
    }
  }, [liveSize, selectedPreset.height, selectedPresetId, simulatedWidth])

  // liveProfile explains what the real browser size means right now. previewProfile
  // explains what the simulated demo width means. Showing both makes the learning
  // goal clearer: the hook is reusable browser logic; the component is responsible
  // for deciding how the UI should respond to the hook's data.
  const liveProfile = buildStreamingLayoutProfile(liveSize)
  const previewProfile = buildStreamingLayoutProfile(previewSize)
  const isMobilePreview = previewProfile.mode === 'Mobile'

  // The visual device is scaled so the simulated phone/tablet/laptop width is easy
  // to compare on screen. The clamp keeps tiny widths from disappearing and large
  // widths from overflowing the assignment card.
  const scalePercent = Math.max(24, Math.min(100, Math.round((previewSize.width / 1280) * 100)))

  function handlePresetClick(preset) {
    // Button clicks switch the simulator to a named viewport. For fixed presets,
    // the slider value is updated immediately so the displayed device and chart
    // match the selected phone/tablet/laptop width.
    setSelectedPresetId(preset.id)

    if (preset.width !== null) {
      setSimulatedWidth(preset.width)
    }
  }

  function handleSliderChange(event) {
    // The slider represents a custom manual test case. Moving it intentionally
    // leaves the live-browser preset, because the student is no longer asking the
    // preview to mirror the real window; they are choosing a demonstration width.
    setSelectedPresetId('custom')
    setSimulatedWidth(Number(event.target.value))
  }

  return (
    <section className="window-size-demo" aria-label="Streaming layout window size demo">
      <div className="window-size-device-shell">
        <div
          className={`window-size-screen ${isMobilePreview ? 'is-mobile-preview' : 'is-full-preview'}`}
          style={{ '--preview-scale': `${scalePercent}%` }}
        >
          {/* This box represents the video player. Its position and surrounding
              panels change when previewProfile crosses the mobile/full breakpoint. */}
          <div className="window-size-video">Stream Preview</div>

          {/* Full layouts have enough horizontal room for a side panel. Mobile
              layouts omit it so the simulated phone stays compact and stacked. */}
          {!isMobilePreview && (
            <div className="window-size-side-panel" aria-label="Full layout side panel">
              <span />
              <span />
              <span />
            </div>
          )}

          {/* These simple bars stand in for playback controls. Keeping them in both
              layouts helps students see that the same content can be rearranged by
              layout rules rather than replaced by a completely different component. */}
          <div className="window-size-controls">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      <div className="window-size-demo-details">
        <p className="window-size-eyebrow">Current Browser Size</p>
        <h3>{liveSize.width}px × {liveSize.height}px</h3>
        <p>
          The reusable <code>useWindowSize</code> hook still reads the real browser window. The controls
          below simulate smaller and larger viewing widths so the responsive behavior is visible without
          needing to manually resize the whole browser every time.
        </p>

        <div className="window-size-preview-controls" aria-label="Preview size controls">
          {previewPresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={selectedPresetId === preset.id ? 'active' : ''}
              onClick={() => handlePresetClick(preset)}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <label className="window-size-slider-label">
          <span>Simulated Preview Width</span>
          <strong>{previewSize.width}px</strong>
          <input
            type="range"
            min="320"
            max="1280"
            step="10"
            value={Math.max(320, Math.min(1280, previewSize.width || 320))}
            onChange={handleSliderChange}
            aria-label="Simulated preview width"
          />
        </label>

        <p className="window-size-preview-note">
          <strong>Preview note:</strong>{' '}
          {selectedPresetId === 'custom' ? 'Custom slider width selected for manual breakpoint testing.' : selectedPreset.note}
        </p>

        <div className="window-size-stat-grid">
          <article>
            <span>Live Hook Mode</span>
            <strong>{liveProfile.mode}</strong>
          </article>
          <article>
            <span>Preview Mode</span>
            <strong>{previewProfile.mode} preview</strong>
          </article>
          <article>
            <span>Preview Columns</span>
            <strong>{previewProfile.columns}</strong>
          </article>
        </div>

        <div className="window-size-chart-card">
          <div className="window-size-chart-label">
            <span>Simulated Width Chart</span>
            <strong>{previewProfile.chartValue}%</strong>
          </div>
          <div className="window-size-chart-track" aria-label="Simulated viewport width chart">
            <span style={{ width: `${previewProfile.chartValue}%` }} />
          </div>
        </div>

        <p><strong>Placement:</strong> {previewProfile.playerPlacement}</p>
        <p><strong>Recommendation:</strong> {previewProfile.recommendation}</p>
      </div>
    </section>
  )
}
