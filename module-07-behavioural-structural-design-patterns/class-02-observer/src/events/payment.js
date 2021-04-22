export default class Payment {
  constructor(paymentSubject) {
    this.paymentSubject = paymentSubject
  } 

  creditCard(paymentData) {
    console.log(`\na payment occured from ${paymentData.name}`)
    this.paymentSubject.notify(paymentData)
  }
}