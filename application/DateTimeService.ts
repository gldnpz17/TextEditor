interface DateTimeService {
  getNow(): Date
}

class MockDateTimeService implements DateTimeService {
  date: Date
  constructor(date: Date) {
    this.date = date
  }

  getNow(): Date {
    return this.date
  }
}

export {
  MockDateTimeService
}

export type {
  DateTimeService
}