const { deepStrictEqual } = require('assert')
const { assert } = require('console')
const sinon = require('sinon')
const Service = require('./service')

const BASE_URL_1 = 'https://swapi.dev/api/planets/1/'
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/'

const mocks = {
  tatooine: require('../mocks/Tatooine.json'),
  alderaan: require('../mocks/Alderaan.json')
}

;
(async () => {
  {
      // It uses internet to performer all the tests
      // const service = new Service()
      // const resultWithoutStub = await service.makeRequest(BASE_URL_1);
      // console.log(JSON.stringify(resultWithoutStub))  
  } 

  const service = new Service()
  const stub = sinon.stub(service, service.makeRequest.name)
  
  stub.withArgs(BASE_URL_1).resolves(mocks.tatooine)
  stub.withArgs(BASE_URL_2).resolves(mocks.alderaan)
  
  { 
    const expectedResult = {
      name: 'Tatooine', 
      surfaceWater: '1', 
      appearedIn: 5
    }

    const resultWithStub = await service.getPlanet(BASE_URL_1)
    deepStrictEqual(resultWithStub, expectedResult)
  }

  {
    const expectedResult = {
      name: 'Alderaan', 
      surfaceWater: '40', 
      appearedIn: 2
    }

    const resultWithStub = await service.getPlanet(BASE_URL_2)
    deepStrictEqual(resultWithStub, expectedResult)
  }
})()