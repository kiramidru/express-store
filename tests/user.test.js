const request = require('supertest')
const app = require('../app')

describe('GET /users/:id', () => {
    it('should fetch a user if it exists', async () => {
        const response = await request(app).get('/users/12345')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('id', '12345')
    })
    it('should return 404 if user does not exist', async() => {
        const response = await request(app).get('users/nonExistingUser')
        expect(response.statusCode).toBe(404)
    })
})
