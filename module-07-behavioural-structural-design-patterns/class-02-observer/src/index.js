import PaymentSubject from './subjects/paymentSubject.js'
import Payment from './events/payment.js'
import Shipment from './observers/shipment.js'
import Markting from './observers/markting.js'

const subject = new PaymentSubject()
const markting = new Markting()
const shipment = new Shipment()

subject.subscribe(markting)
subject.subscribe(shipment)

const paymentData = { id: 1, name: 'Fulano da Silva Sauro' }
const payment = new Payment(subject)

payment.creditCard(paymentData)