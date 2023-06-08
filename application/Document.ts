interface Snapshot {
  text: string
}

interface Document {
  snapshots: Snapshot[]
  restore(snapshot: Snapshot): void
  commit(): void
  setSavingStrategy(strategy: SavingStrategy): void
  save(): void
}