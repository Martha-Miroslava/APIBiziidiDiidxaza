const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const {server} = require("../src/app");
const Lessons = require("../src/models/lessons");
chai.should();
chai.use(chaiHttp);
let accessToken= null;

describe("GET Tests Lessons",() => {
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

    it("GET /Lessons", (done) => {
        chai.request(server).get("/lessons")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(200);
            response.body.should.be.a("array");
            response.body.length.should.be.eq(2);
            done();
        });
    });
});

describe("POST Tests Lessons",() => {
    let idLesson = null;

    before((done) => {
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

    it("Post /Lesson Bad request", (done) => {
        chai.request(server).post("/lessons")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("Post /Lesson Bad Request Points", (done) => {
        const lesson = {
            name: "Números",
            description: "Aprender los números en Zapoteco",
            pointsTotal: 4
        }
        chai.request(server).post("/lessons").send(lesson)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            idLesson = response.body._id;
            done();
        });
    });

    it("Post /Lesson", (done) => {
        const lesson = {
            name: 'Números',
            description: 'Aprender los números en Zapoteco',
            pointsTotal: 5
        }
        chai.request(server).post("/lessons").send(lesson)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(201);
            response.body.should.be.a("object");
            response.body.should.have.property("_id");
            response.body.should.have.property("name");
            response.body.should.have.property("description");
            response.body.should.have.property("pointsTotal");
            idLesson = response.body._id;
            done();
        });
    });

    after(async () => {
        await Lessons.deleteOne({_id:idLesson});
    });
});

after(() => {
    server.close();
    mongoose.connection.close();
});
