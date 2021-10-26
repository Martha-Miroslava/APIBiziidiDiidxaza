const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const {server} = require("../src/app");
const LessonRecords = require("../src/models/lessonRecords");
chai.should();
chai.use(chaiHttp);
let accessToken= null;

describe("GET Tests LessonRecords",()=> {
    before((done) => {
        const login = {
            username: "MiroStar",
	        password: "Marst1245#" 
        };
        chai.request(server).post("/login").send(login)
        .end( (error, response) => {
            accessToken = response.body.token;
            done();
        });
    });

    it("GET /LessonRecords Bad Request", (done) => {
        chai.request(server).get("/lessonRecords/6171f")
        .auth(accessToken, { type: 'bearer' })
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("GET /LessonRecords Not Found", (done) => {
        chai.request(server).get("/lessonRecords/6171fb2eeb326a2f1850c22c")
        .auth(accessToken, { type: 'bearer' })
        .end( (error, response) => {
            response.should.have.status(404);
            response.body.should.have.property("message");
            response.body.should.have.property("message").eq("No se encontro registro(s)");
            done();
        });
    });

    it("GET /LessonRecords", (done) => {
        chai.request(server).get("/lessonRecords/6168cf9563929f8f000c7614")
        .auth(accessToken, { type: 'bearer' })
        .end( (error, response) => {
            response.should.have.status(200);
            response.body.should.be.a("array");
            response.body.length.should.be.eq(2);
            done();
        });
    });
});

describe("POST Tests LessonReport",() => {
    let idLessonRecord = null;
    
    before((done) => {
        const login = {
            username: "MiroStar",
	        password: "Marst1245#"
        };
        chai.request(server).post("/login").send(login)
        .end( (error, response) => {
            accessToken = response.body.token;
            done();
        });
    });

    it("POST /LessonRecords", (done) => {
        const lessonRecord = {
            pointsObtained: 45,
            idAccount: "6168cf9563929f8f000c7614",
            idLesson: "6171fb7deb326a2f1850c22f"
        }
        chai.request(server).post("/lessonRecords").send(lessonRecord)
        .auth(accessToken, { type: 'bearer' })
        .end( (error, response) => {
            response.should.have.status(201);
            response.body.should.be.a("object");
            response.body.should.have.property("_id");
            response.body.should.have.property("dateCreation");
            response.body.should.have.property("pointsObtained");
            response.body.should.have.property("idAccount");
            response.body.should.have.property("idLesson");
            idLessonRecord = response.body._id;
            done();
        });
    });

    it("POST /LessonRecords Bad Request", (done) => {
        const lessonRecord = {
            pointsObtained: "Martha",
            idAccount: 'vjfnjvnfj',
            idLesson: 'nvjfnvnfj'
        }
        chai.request(server).post("/lessonRecords").send(lessonRecord)
        .auth(accessToken, { type: 'bearer' })
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("POST /LessonRecords Bad Request Account", (done) => {
        const lessonRecord = {
            pointsObtained: 45,
	        idAccount: "6168cf9563929f8f000b7618",
	        idLesson: '6171fb7deb326a2f1850c22f'
        }
        chai.request(server).post("/lessonRecords").send(lessonRecord)
        .auth(accessToken, { type: 'bearer' })
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("message");
            response.body.should.have.property("message").eq("La cuenta no existe");
            done();
        });
    });

    it("POST /LessonRecords Bad Request Lesson", (done) => {
        const lessonRecord = {
            pointsObtained: 45,
	        idAccount: "6168cf9563929f8f000c7614",
	        idLesson: '6168cf9563929f8f000b7618'
        }
        chai.request(server).post("/lessonRecords").send(lessonRecord)
        .auth(accessToken, { type: 'bearer' })
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("message");
            response.body.should.have.property("message").eq("La lección no existe");
            done();
        });
    });

    after(async () => {
        await LessonRecords.deleteOne({_id:idLessonRecord});
    });
});

after(() => {
    server.close();
    mongoose.connection.close();
});