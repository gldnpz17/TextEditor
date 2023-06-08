import { MockDateTimeService } from "../application/DateTimeService"
import { DocumentImpl } from "../application/Document"
import { MockSavingStrategy } from "../application/SavingStrategy"

const sampleText = 'Lorem Ipsum'
const sampleText2 = 'Dolor Sit Amet'
const mockDate = new Date()
const mockDateTimeService = new MockDateTimeService(mockDate)

test('Updates text', () => {
  const d = new DocumentImpl(mockDateTimeService)

  d.setText(sampleText)
  
  expect(d.getText()).toBe(sampleText)
})

test('Commits history', () => {
  const d = new DocumentImpl(mockDateTimeService)

  d.setText(sampleText)
  d.commit()

  expect(d.snapshots[0].text).toBe(sampleText)
  expect(d.snapshots[0].timestamp).toBe(mockDate)
})

test('Restores history', () => {
  const d = new DocumentImpl(mockDateTimeService)

  d.setText(sampleText)
  d.commit()
  d.setText(sampleText2)
  d.restore(d.snapshots[0])

  expect(d.getText()).toBe(sampleText)
})

test('Commits change before restoring', () => {
  const d = new DocumentImpl(mockDateTimeService)

  d.setText(sampleText)
  d.commit()
  d.setText(sampleText2)
  d.restore(d.snapshots[0])

  expect(d.snapshots[1].text).toBe(sampleText2)
})

test('Saves the whole document', () => {
  const d = new DocumentImpl(mockDateTimeService)
  const s = new MockSavingStrategy()
  const save = jest.spyOn(s, 'save')

  d.setText(sampleText)
  d.setSavingStrategy(s)
  d.save()

  expect(save).toBeCalled()
  expect(s.document).toBe(d)
})

test('Throws on null text', () => {
  const d = new DocumentImpl(mockDateTimeService)

  expect(() => d.setText(null)).toThrowError('Null text argument.')
})
