import { expect, describe, test, jest, beforeAll } from '@jest/globals';

import Payment from '../src/events/payment.js';
import Markting from '../src/observers/markting.js';
import Shipment from '../src/observers/shipment.js';
import PaymentSubject from '../src/subjects/paymentSubject.js';

describe('Test Suite for Observer Pattern', () => {
  beforeAll(() => {
    jest.spyOn(console, console.log.name).mockImplementation(() => {})
  })

  test('#PaymentSubject notify observers', () => {
    const subsject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }
    const data = { id: 1, name: 'Ciclano da Silva' }
    
    subsject.subscribe(observer)
    subsject.notify(data)

    expect(observer.update).toBeCalledWith(data)
  })

  test('#PaymentSubject should not notify unsubscribed observers', () => {
    const subsject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }
    const data = { id: 1, name: 'Ciclano da Silva' }
    
    subsject.subscribe(observer)
    subsject.unsubscribe(observer)

    subsject.notify(data)

    expect(observer.update).not.toHaveBeenCalled()
  })

  test('#Payment should notify subject after a payment using credit card', () => {
    const subsject = new PaymentSubject()
    const payment = new Payment(subsject)

    const paymentSubjectNotifySpy = jest.spyOn(
      payment.paymentSubject, 
      payment.paymentSubject.notify.name
    )
    const paymentData = { id: 1, name: 'Ciclano da Silva' }
    
    payment.creditCard(paymentData)
    expect(paymentSubjectNotifySpy).toBeCalledWith(paymentData)
  })

  test('#All should notify subject after a payment using credit card', () => {
    const shipment = new Shipment()
    const markting = new Markting()
    const subsject = new PaymentSubject()

    subsject.subscribe(shipment)
    subsject.subscribe(markting)

    const shipmentSpy = jest.spyOn(shipment, shipment.update.name)
    const marktingSpy = jest.spyOn(markting, markting.update.name)
    const paymentData = { id: 1, name: 'Ciclano da Silva' } 
    
    const payment = new Payment(subsject)
    payment.creditCard(paymentData)

    expect(shipmentSpy).toBeCalledWith(paymentData)
    expect(marktingSpy).toBeCalledWith(paymentData)
  })
})