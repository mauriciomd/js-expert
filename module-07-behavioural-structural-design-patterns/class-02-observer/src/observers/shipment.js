export default class Shipment {
  update({ id, name }) {
    console.log(`[${id}]: [shipment] will pack the user's order to [${name}]`)
  }
}