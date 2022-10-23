export class TimeoutError extends Error {
  data: { duration: number }

  constructor(message: string, duration: number) {
    super(message)
    this.data = { duration }
  }
}
