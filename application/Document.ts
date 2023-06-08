import { DateTimeService } from "./DateTimeService"
import { SavingStrategy } from "./SavingStrategy"

interface Snapshot {
  timestamp: Date
  text: string
}

class SnapshotImpl implements Snapshot {
  timestamp: Date
  text: string
  
  constructor(text: string, timestamp: Date) {
    this.text = text
    this.timestamp = timestamp
  }
}

interface Document {
  snapshots: Snapshot[]
  setText(text: string): void
  getText(): string
  restore(snapshot: Snapshot): void
  commit(): void
  setSavingStrategy(strategy: SavingStrategy): void
  save(): void
}

class DocumentImpl implements Document {
  snapshots: Snapshot[] = []
  dateTimeService: DateTimeService
  text: string = ""
  savingStrategy: SavingStrategy

  constructor(dateTimeService: DateTimeService) {
    this.dateTimeService = dateTimeService
  }
  
  setText = (text: string): void => {
    if (text == null) {
      throw new Error('Null text argument.')
    }

    this.text = text
  }
  getText = (): string => {
    return this.text
  }
  restore = (snapshot: Snapshot): void => {
    this.commit()
    this.text = snapshot.text
  }
  commit = (): void => {
    const snapshot = new SnapshotImpl(this.text, this.dateTimeService.getNow())
    this.snapshots.push(snapshot)
  }
  setSavingStrategy = (strategy: SavingStrategy): void => {
    this.savingStrategy = strategy
  }
  save = (): void => {
    this.savingStrategy.save(this)
  }
}

export {
  DocumentImpl,
  SnapshotImpl
}

export type {
  Document,
  Snapshot
}