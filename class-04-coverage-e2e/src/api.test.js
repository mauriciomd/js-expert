const { it, describe } = require('mocha')
const request = require('supertest')
const assert = require('assert')
const app = require('./api')

describe('API Suite test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP status code 200', async () => {
      const response = await request(app).get('/contact').expect(200)
      assert(response.text, 'contact us page')
    })
  }) 

  describe('/hello', () => {
    it('should request an inexistent route /hi and redirect to default route', async () => {
      const response = await request(app).get('/hi').expect(200)
      assert(response.text, 'Hello World')
    })
  })

  describe('/login', () => {
    it('should be able to sign in on route /login and return HTTP status code 200', async () => {
      const response = await request(app)
                              .post('/login')
                              .send({
                                login: 'validLogin',
                                password: 'validPassword'
                              })
                              .expect(200)

      assert.deepStrictEqual(response.text, 'Login has been succeeded')
    })

    it('should not be able to sign in on route /login  with wrong credentials and return HTTP status code 401', async () => {
      const response = await request(app)
                              .post('/login')
                              .send({
                                login: 'invalidLogin',
                                password: 'validPassword'
                              })
                              .expect(401)
      
      assert.ok(response.unauthorized)
      assert.deepStrictEqual(response.text, 'Login failed')
    })
  })
})