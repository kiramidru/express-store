import request from 'supertest'
import app from '../app.js'

describe('GET /user/:userId', () => {
    it('should fetch a user if it exists', async () => {
        const response = await request(app).get('/user/1')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('email', 'kiramidru@gmail.com')
    })
    it('should return 404 if user does not exist', async() => {
        const response = await request(app).get('/user/0')
        expect(response.statusCode).toBe(404)
    })
})


