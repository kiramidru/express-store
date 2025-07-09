import request from 'supertest'
import app from '../app'

describe('GET /user/:userId', () => {
    it('should fetch a user if it exists', async () => {
        const response = await request(app).get('/user/1000')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('username', 'kira')
    })
    it('should return 404 if user does not exist', async() => {
        const response = await request(app).get('/user/1001')
        expect(response.statusCode).toBe(404)
    })
})
