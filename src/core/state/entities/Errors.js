export class Errors {
  constructor() {
    this.messages = []
  }

  setErrors(errors) {
    this.messages.push(errors)
  }

  clearErrors() {
    this.messages = []
  }
}
