const supertest = require('supertest');
const mongoose = require('mongoose');
const {app, server} = require('../src/app');
const api = supertest(app);

test('Status code 200', async() => {
    await api.get('/states')
    .expect(200)
    .expect('content-Type', /application\/json/);
})


afterAll(async() =>{
    await mongoose.connection.close();
    await server.close();
})
