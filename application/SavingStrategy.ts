import { Document } from "./Document"

interface SavingStrategy {
  save(document: Document): void
  load(): Document
}

class MockSavingStrategy implements SavingStrategy {
  document: Document = null
  save = (document: Document): void => {
    this.document = document
  }
  load(): Document {
    return this.document
  }
}

class LocalStorageSavingStrategy implements SavingStrategy {
  save(document: Document): void {
    throw new Error("Method not implemented.")
  }
  load(): Document {
    throw new Error("Method not implemented.")
  }
}

export {
  MockSavingStrategy,
  LocalStorageSavingStrategy
}

export type {
  SavingStrategy
}