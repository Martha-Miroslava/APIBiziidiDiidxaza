const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const {server} = require("../src/app");
chai.should();
chai.use(chaiHttp);

describe("POST Login",() => {
    it("POST /Login", (done) => {
        const login = {
            username: "Karla",
            password: "Marst1245#"
        };
        chai.request(server).post("/login").send(login)
        .end( (error, response) => {
            response.should.have.status(201);
            response.body.should.be.a("object");
            response.body.should.have.property("token");
            response.body.should.have.property("account");
            response.body.should.have.property("account").have.property("name");
            response.body.should.have.property("account").have.property("lastname");
            done();
        });
    });

    it("POST /Login  Bad Request", (done) => {
        const login = {
            username: "    ",
            password: "Marst1245#"
        };
        chai.request(server).post("/login").send(login)
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("POST /Login  Bad Request Password", (done) => {
        const login = {
            username: "Karla",
            password: "Mmol157200#"
        };
        chai.request(server).post("/login").send(login)
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("La contraseña es inválida");
            done();
        });
    });

    it("POST /Login Forbidden", (done) => {
        const login = {
            username: "Miroslava25",
            password: "Marst1245#"
        };
        chai.request(server).post("/login").send(login)
        .end( (error, response) => {
            response.should.have.status(403);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("La cuenta esta bloqueada o esta inactiva comuniquese con el administrador");
            done();
        });
    });

    it("POST /Login Not Found", (done) => {
        const login = {
            username: "Karime",
            password: "Marstfrkmv3245#"
        };
        chai.request(server).post("/login").send(login)
        .end( (error, response) => {
            response.should.have.status(404);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("No se encontro la cuenta");
            done();
        });
    });
});

describe("PATCH Login",() => {
    it("PATCH /Login", (done) => {
        const login = {
            username: "MiroStar",
            codeConfirmation: 234990
        };
        chai.request(server).patch("/login").send(login)
        .end( (error, response) => {
            response.should.have.status(200);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("La confirmación es exitosa");
            done();
        });
    });

    it("PATCH /Login  Bad Request", (done) => {
        const login = {
            username: "   ",
            codeConfirmation: 123
        };
        chai.request(server).patch("/login").send(login)
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("PATCH /Login  Bad Request Code", (done) => {
        const login = {
            username: "MiroStar",
            codeConfirmation: 234957
        };
        chai.request(server).patch("/login").send(login)
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("El código de confimación es inválido");
            done();
        });
    });

    it("PATCH /Login Not Found", (done) => {
        const login = {
            username: "Karime",
            codeConfirmation: 234957
        };
        chai.request(server).patch("/login").send(login)
        .end( (error, response) => {
            response.should.have.status(404);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("No se encontro la cuenta o esta bloqueda");
            done();
        });
    });
});

after(() => {
    server.close();
    mongoose.connection.close();
});
