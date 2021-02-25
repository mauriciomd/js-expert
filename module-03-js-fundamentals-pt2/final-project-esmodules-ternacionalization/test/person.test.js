import mocha from 'mocha'
import chai from 'chai'
import Person from '../src/person.js'

const { describe, it } = mocha
const { expect } = chai

describe('Person', () => {
  it('should be able to return a new person from a string', () => {
    const person = Person.generateInstanceFromString(
      '1 Bike,Aviao 1000 2021-01-01 2021-01-10'
    )

    const expected = {
      id: '1',
      vehicles: ['Bike', 'Aviao'],
      kmTraveled: '1000',
      from: '2021-01-01',
      to: '2021-01-10',
    }

    expect(person).to.be.deep.equal(expected)
  })

  it('should format the values', () => {
    const person = Person.generateInstanceFromString(
      '1 Bike,Aviao 1000 2021-01-01 2021-01-10'
    )
    const formattedPerson = person.formatted('pt-BR')
    const expected = {
      id: 1,
      vehicles: 'Bike e Aviao',
      kmTraveled: '1.000 km',
      from: '01 de janeiro de 2021',
      to: '10 de janeiro de 2021',
    }

    expect(formattedPerson).to.be.deep.equal(expected)
  })
})