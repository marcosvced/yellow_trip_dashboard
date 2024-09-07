export class State {
  constructor({ errors, isLoading, data }) {
    this.errors = errors ?? []
    this.isLoading = isLoading ?? false
    this.data = data ?? undefined
  }
}
