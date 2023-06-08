import { MockDateTimeService } from "../application/DateTimeService"
import { DocumentImpl } from "../application/Document"
import { LocalStorageSavingStrategy } from "../application/SavingStrategy"

class MockLocalStorage {
  store = {}
  length = Object.keys(this.store).length

  key = (n: number) => {
    return Object.keys(this.store)[n]
  }
  clear = () => {
    this.store = {}
  }
  getItem = (key: string) => {
    return this.store[key] || null
  }
  setItem = (key: string, value: string) => {
    this.store[key] = String(value)
  }
  removeItem = (key: string) => {
    delete this.store[key]
  }
}

// @ts-ignore
global.window = {}
global.window.localStorage = new MockLocalStorage();

const mockDate = new Date()
const mockDateTimeService = new MockDateTimeService(mockDate)

test('Saves document text', () => {
  const d = new DocumentImpl(mockDateTimeService)
  const s = new LocalStorageSavingStrategy(mockDateTimeService)

  s.save(d)
  const ld = s.load()

  expect(ld.getText()).toBe(d.getText())
})
