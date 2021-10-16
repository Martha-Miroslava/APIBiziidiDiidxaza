const request = require('supertest');
const mongoose = require('mongoose');
const {app, server} = require('../src/app');
//const {dataBaseConnect} = require('../src/connection/ConnectionDB');
//const api = supertest(app);

beforeEach(async () => {
    jest.setTimeout(10000)
})

test('Status code 200', async() => {
    const response = await request(app).get('/states').send();
    expect(response.statusCode).toBe(200)
})


afterAll(async ()  => {
    //await dataBaseConnect.close();
    await mongoose.disconnect();
    await server.close();
});