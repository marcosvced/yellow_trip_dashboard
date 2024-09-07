export default function useProxy(value, observers) {
  return new Proxy({ value }, {
    set: (target, property, value) => {
      target[property] = value
      if (observers.length > 0) {
        observers.forEach(observer => observer(value))
      }
      return true
    },
  })
}
