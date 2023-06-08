interface DateTimeService {
  getNow(): Date
}

class MockDateTimeService implements DateTimeService {
  date: Date
  constructor(date: Date) {
    this.date = date
  }

  getNow = (): Date => {
    return this.date
  }
}

class DateTimeServiceImpl implements DateTimeService {
  getNow = (): Date => {
    return new Date()
  }
}

export {
  MockDateTimeService,
  DateTimeServiceImpl
}

export type {
  DateTimeService
}