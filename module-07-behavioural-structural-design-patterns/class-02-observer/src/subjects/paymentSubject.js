export default class PaymentSubject {
  #observers = new Set()

  // The only responsability is emit events to all subscribers
  notify(data) {
    this.#observers.forEach(observer => observer.update(data))
  }

  subscribe(observable) {
    this.#observers.add(observable)
  }

  unsubscribe(observable) {
    this.#observers.delete(observable)
  }
}