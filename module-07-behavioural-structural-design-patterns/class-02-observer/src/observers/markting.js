// Important
// The observer is reponsible to manage its errors and exceptions
export default class Markting {
  update({ id, name }) {
    console.log(`[${id}]: [markting] will send an e-mail to [${name}]`)
  }
}