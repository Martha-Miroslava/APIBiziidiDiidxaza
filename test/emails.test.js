const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const {server} = require("../src/App");
chai.should();
chai.use(chaiHttp);

describe("POST Tests Emails",() => {
    it("POST /emails Not Found", (done) => {
        const email = {
            email: "martha_13_7@gmail.com"
        };
        chai.request(server).post("/emails").send(email)
        .end( (error, response) => {
            response.should.have.status(404);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("No se encontro la cuenta");
            done();
        });
     });

    it("POST /emails Bad Request", (done) => {
        const email = {
            email: 1223
        };
        chai.request(server).post("/emails").send(email)
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("POST /emails", (done) => {
        const email = {
            email: "martha_15_7@outlook.com"
        };
        chai.request(server).post("/emails").send(email)
        .end( (error, response) => {
            response.should.have.status(201);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("El código de confirmación se reenvio exitosamente");
            done();
        });
     });
});


describe("POST Tests Emails Accounts",() => {
    let accessToken= null;

    before((done) => {
        const login = {
            username:"Karla",
	        password:"Marst1245#"
        };
        chai.request(server).post("/login").send(login)
        .end( (error, response) => {
            response.should.have.status(201);
            response.body.should.be.a("object");
            response.body.should.have.property("token");
            accessToken = response.body.token;
            done();
        });
    });

    it("POST /emails Bad Request", (done) => {
        const email = {
            email: 245,
            title: 245,
            message: "    "
        };
        chai.request(server).post("/emails").send(email)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("POST /emails/account", (done) => {
        const email = {
            email: "martha_15_7@outlook.com",
            title: "Cuenta bloqueda",
            message: "Estimado usuario su cuenta esta bloqueda"
        };
        chai.request(server).post("/emails/account").send(email)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(201);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("El mensaje se envio exitosamente");
            done();
        });
     });
});

after(() => {
    server.close();
    mongoose.connection.close();
});