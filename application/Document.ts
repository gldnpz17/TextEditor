import { DateTimeService } from "./DateTimeService"
import { SavingStrategy } from "./SavingStrategy"

interface Snapshot {
  timestamp: Date
  text: string
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

  constructor(dateTimeService: DateTimeService) {
    this.dateTimeService = dateTimeService
  }
  
  setText(text: string): void {
    throw new Error("Method not implemented.")
  }
  getText(): string {
    throw new Error("Method not implemented.")
  }
  restore(snapshot: Snapshot): void {
    throw new Error("Method not implemented.")
  }
  commit(): void {
    throw new Error("Method not implemented.")
  }
  setSavingStrategy(strategy: SavingStrategy): void {
    throw new Error("Method not implemented.")
  }
  save(): void {
    throw new Error("Method not implemented.")
  }

}

export {
  DocumentImpl
}

export type {
  Document,
  Snapshot
}