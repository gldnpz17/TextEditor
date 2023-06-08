import { DocumentImpl } from "../application/Document"
import { LocalStorageSavingStrategy } from "../application/SavingStrategy"

const mockDate = new Date()
const mockDateTimeService = new MockDateTimeService(mockDate)

test('Saves to local storage', () => {
  const d = new DocumentImpl(mockDateTimeService)
  const s = new LocalStorageSavingStrategy()

  s.save(d)
  const ld = s.load()

  expect(ld.getText()).toBe(d.getText())
})
