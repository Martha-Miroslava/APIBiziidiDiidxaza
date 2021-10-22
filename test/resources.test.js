const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const {server} = require('../src/app');
chai.should();
chai.use(chaiHttp);

let accessToken = null;

describe("POST Tests Resource Account",()=>{
    it("POST /Resource Account Bad Request", (done) =>{
        chai.request(server).post("/resources/account")
        .field('Content-Type', 'multipart/form-data')
        .field('idAccount', '6164db5')
        .attach('file', `${__dirname}/resources/imageAccount.png`, 'imageAccount.png')
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("POST /Resource Account Bad Request Account", (done) =>{
        chai.request(server).post("/resources/account")
        .field('Content-Type', 'multipart/form-data')
        .field('idAccount', '6164db5823242f430c487fcb')
        .attach('file', `${__dirname}/resources/imageAccount.png`, 'imageAccount.png')
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("message");
            response.body.should.have.property("message").eq("La cuenta no existe");
            done();
        });
    });

    it("POST /Resource Account Bad Request File", (done) =>{
        chai.request(server).post("/resources/account")
        .field('Content-Type', 'multipart/form-data')
        .field('idAccount', '6164db5823242f430c487fca')
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("message");
            response.body.should.have.property("message").eq("Necesita subir una imagen");
            done();
        });
    });

    it("POST /Resource Account Bad Request File Extension", (done) =>{
        chai.request(server).post("/resources/account")
        .field('Content-Type', 'multipart/form-data')
        .field('idAccount', '6164db5823242f430c487fca')
        .attach('file', `${__dirname}/resources/imageError.bmp`, 'imageError.bmp')
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("message");
            response.body.should.have.property("message").eq("Extensión no admitida o el archivo debe pesar menos de 10MB");
            done();
        });
    });
});

describe("POST Tests Resource Lesson",()=>{
    before((done) =>{
        const login = {
            username: "Karla",
	        password: "Marst1245#"
        };
        chai.request(server).post("/login").send(login)
        .end( (error, response) => {
            accessToken = response.body.token;
            done();
        });
    });

    it("POST /Resource Lesson Bad Request", (done) =>{
        chai.request(server).post("/resources/lesson")
        .field('Content-Type', 'multipart/form-data')
        .field('idLesson', '6164vrfdb5')
        .attach('file', `${__dirname}/resources/image.png`, 'image.png')
        .auth(accessToken, { type: 'bearer' })
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("POST /Resource Lesson Bad Request Lesson", (done) =>{
        chai.request(server).post("/resources/lesson")
        .field('Content-Type', 'multipart/form-data')
        .field('idLesson', '6164db5823242f430c487fcb')
        .attach('file', `${__dirname}/resources/image.png`, 'image.png')
        .auth(accessToken, { type: 'bearer' })
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("message");
            response.body.should.have.property("message").eq("La lección no existe");
            done();
        });
    });

    it("POST /Resource Lesson Bad Request File", (done) =>{
        chai.request(server).post("/resources/lesson")
        .field('Content-Type', 'multipart/form-data')
        .field('idLesson', '6171fb2eeb326a2f1850c22e')
        .auth(accessToken, { type: 'bearer' })
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("message");
            response.body.should.have.property("message").eq("Necesita subir una imagen");
            done();
        });
    });

    it("POST /Resource Lesson Bad Request File Extension", (done) =>{
        chai.request(server).post("/resources/lesson")
        .field('Content-Type', 'multipart/form-data')
        .field('idLesson', '6171fb2eeb326a2f1850c22e')
        .attach('file', `${__dirname}/resources/imageError.bmp`, 'imageError.bmp')
        .auth(accessToken, { type: 'bearer' })
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("message");
            response.body.should.have.property("message").eq("Extensión no admitida o el archivo debe pesar menos de 10MB");
            done();
        });
    });
});

describe("POST Tests Resource Audio",()=>{
    before((done) =>{
        const login = {
            username: "Karla",
	        password: "Marst1245#"
        };
        chai.request(server).post("/login").send(login)
        .end( (error, response) => {
            accessToken = response.body.token;
            done();
        });
    });

    it("POST /Resource Audio Bad Request", (done) =>{
        chai.request(server).post("/resources/audio")
        .field('Content-Type', 'multipart/form-data')
        .field('idQuestion', '6164vrfdb5')
        .attach('file', `${__dirname}/resources/audio.mp3`, 'audio.mp3')
        .auth(accessToken, { type: 'bearer' })
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("POST /Resource Audio Bad Request Question", (done) =>{
        chai.request(server).post("/resources/audio")
        .field('Content-Type', 'multipart/form-data')
        .field('idQuestion', '6164db5823242f430c487fcb')
        .attach('file', `${__dirname}/resources/audio.mp3`, 'audio.mp3')
        .auth(accessToken, { type: 'bearer' })
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("message");
            response.body.should.have.property("message").eq("La pregunta no existe");
            done();
        });
    });

    it("POST /Resource Audio Bad Request File", (done) =>{
        chai.request(server).post("/resources/audio")
        .field('Content-Type', 'multipart/form-data')
        .field('idQuestion', '6171fde5eb326a2f1850c231')
        .auth(accessToken, { type: 'bearer' })
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("message");
            response.body.should.have.property("message").eq("Necesita subir un audio");
            done();
        });
    });

    it("POST /Resource Audio Bad Request File Extension", (done) =>{
        chai.request(server).post("/resources/audio")
        .field('Content-Type', 'multipart/form-data')
        .field('idQuestion', '6171fde5eb326a2f1850c231')
        .attach('file', `${__dirname}/resources/imageError.bmp`, 'imageError.bmp')
        .auth(accessToken, { type: 'bearer' })
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("message");
            response.body.should.have.property("message").eq("Extensión no admitida o el archivo debe pesar menos de 20MB");
            done();
        });
    });
});


describe("PATCH Tests Resource",()=>{
    before((done) =>{
        const login = {
            username: "Karla",
	        password: "Marst1245#"
        };
        chai.request(server).post("/login").send(login)
        .end( (error, response) => {
            accessToken = response.body.token;
            done();
        });
    });

    it("PATCH /Resource Bad Request", (done) =>{
        chai.request(server).patch("/resources")
        .auth(accessToken, { type: 'bearer' })
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("PATCH /Resource Not Found", (done) =>{
        const url = {
            URL: "../images/accounts/6164db5823242f430c487fcb.png"
        }
        chai.request(server).patch("/resources").send(url)
        .auth(accessToken, { type: 'bearer' })
        .end( (error, response) => {
            response.should.have.status(404);
            response.body.should.have.property("message");
            response.body.should.have.property("message").eq("No se encontro registro(s)");
            done();
        });
    });

});

describe("DELETE Tests Resource",()=>{
    before((done) =>{
        const login = {
            username: "Karla",
	        password: "Marst1245#"
        };
        chai.request(server).post("/login").send(login)
        .end( (error, response) => {
            accessToken = response.body.token;
            done();
        });
    });

    it("DELETE /Resource Bad Request", (done) =>{
        chai.request(server).delete("/resources")
        .auth(accessToken, { type: 'bearer' })
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("DELETE /Resource Bad Request File", (done) =>{
        const url = {
            URL: "../images/accounts/6164db5823242f430c487fcb.png"
        }
        chai.request(server).delete("/resources").send(url)
        .auth(accessToken, { type: 'bearer' })
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("message");
            response.body.should.have.property("message").eq("No existe el archivo");
            done();
        });
    });
});


after(() => {
    server.close();
    mongoose.connection.close();
});