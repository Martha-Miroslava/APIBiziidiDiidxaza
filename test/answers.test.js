const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const {server} = require("../src/App");
chai.should();
chai.use(chaiHttp);
let accessToken= null;

describe("GET Tests Answers",() => {
    before((done) => {
        const login = {
            username:"MiroStar",
	        password:"Marst1245#" 
        };
        chai.request(server).post("/login").send(login)
        .end( (error, response) => {
            accessToken = response.body.token;
            done();
        });
    });

    it("GET /Answers Bad Request", (done) => {
        chai.request(server).get("/answers/6171f")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("GET /Answers Not Found", (done) => {
        chai.request(server).get("/answers/6171fb2eeb326a2f1850c22c")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(404);
            response.body.should.have.property("messageNotFound");
            response.body.should.have.property("messageNotFound").eq("No se encontro registro(s)");
            done();
        });
    });

    it("GET /Answers", (done) => {
        chai.request(server).get("/answers/6173660d944b5e03bc7ddf3c")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(200);
            response.body.should.be.a("array");
            response.body.length.should.be.eq(2);
            done();
        });
    });
});

after(() => {
    server.close();
    mongoose.connection.close();
});