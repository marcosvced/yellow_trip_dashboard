export const useSetSearchParams = (key, value) => {
  const url = new URL(window.location.href)
  if ('object' === typeof value) {
    url.searchParams.set(key, JSON.stringify(value))
  }
  else {
    url.searchParams.set(key, value)
  }
  window.history.pushState({}, '', url)
}
