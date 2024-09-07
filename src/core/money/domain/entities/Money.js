export class Money {
  constructor({ value, currency }) {
    this.value = value
    this.currency = currency ?? 'USD'
  }
}
