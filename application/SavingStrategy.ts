import { Document } from "./Document"

interface SavingStrategy {
  save(document: Document): void
}

class MockSavingStrategy implements SavingStrategy {
  document: Document = null
  save = (document: Document): void => {
    this.document = document
  }
}

export {
  MockSavingStrategy
}

export type {
  SavingStrategy
}