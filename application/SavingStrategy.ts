import { DateTimeService } from "./DateTimeService"
import { Document, DocumentImpl } from "./Document"

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
  itemKey = 'document'
  dateTimeService: DateTimeService

  constructor(dateTimeService: DateTimeService) {
    this.dateTimeService = dateTimeService
  }

  save(document: Document): void {
    const data = JSON.stringify({
      text: document.getText()
    })

    window.localStorage.setItem(this.itemKey, data)
  }
  load(): Document {
    const data = JSON.parse(window.localStorage.getItem(this.itemKey))
    const document = new DocumentImpl(this.dateTimeService)

    document.setText(data.text)

    return document
  }
}

export {
  MockSavingStrategy,
  LocalStorageSavingStrategy
}

export type {
  SavingStrategy
}