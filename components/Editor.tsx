import { Dispatch, useEffect, useRef, useState } from "react"
import { DateTimeServiceImpl } from "../application/DateTimeService"
import { Snapshot } from "../application/Document"
import { LocalStorageSavingStrategy } from "../application/SavingStrategy"

const useRerender = () => {
  const [_, setState] = useState(0)
  return () => setState(Math.random())
}

type KeyState = 'up' | 'down'

const Editor = () => {
  const [previewSnapshot, setPreviewSnapshot] = useState<Snapshot>(null)
  const { current: dateTimeService } = useRef(new DateTimeServiceImpl())
  const { current: savingStrategy } = useRef(new LocalStorageSavingStrategy(dateTimeService))
  const { current: doc } = useRef(savingStrategy.load())

  const rerender = useRerender()

  useEffect(() => {
    doc.setSavingStrategy(savingStrategy)

    document.addEventListener('keydown', e => {
      const isCorrectCombination = e.ctrlKey && e.key === 's'
      if (!isCorrectCombination) return
      e.preventDefault()
      doc.commit()
      doc.save()
      rerender()
    })
  }, [])

  return (
    <div style={{ width: "30rem", maxWidth: "100%", display: "flex" }}>
      {!previewSnapshot && (
        <textarea
          style={{ width: "20rem" }}
          value={doc.getText()}
          rows={23}
          onChange={(e) => {
            doc.setText(e.target.value)
            doc.save()
            rerender()
          }}
        />
      )}
      {previewSnapshot && (
        <div>
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1 }}>Restore snapshot?</div>
            <button
              onClick={() => {
                doc.restore(previewSnapshot)
                doc.save()
                rerender()
                setPreviewSnapshot(null)
              }}
            >
                Yes
            </button>
            <button onClick={() => setPreviewSnapshot(null)}>No</button>
          </div>
          <textarea
            style={{ width: "20rem", display: "block" }}
            value={previewSnapshot.text}
            rows={22}
            disabled
          />
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {doc.snapshots.map(snapshot => (
          <button onClick={() => setPreviewSnapshot(snapshot)}>
            {snapshot.timestamp.toLocaleString()}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Editor