interface Snapshot {
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