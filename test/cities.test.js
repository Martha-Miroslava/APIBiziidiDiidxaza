const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const {server} = require("../src/app");
const Cities = require("../src/models/cities");
chai.should();
chai.use(chaiHttp);

describe("GET Tests Cities",() => {
    it("GET /Cities", (done) => {
       chai.request(server).get("/cities/61645a187cab4c38442c4ed6")
        .end( (error, response) => {
            response.should.have.status(200);
            response.body.should.be.a("array");
            response.body.length.should.be.eq(1);
            done();
        });
    });

    it("GET /Cities Not Found", (done) => {
        chai.request(server).get("/cities/61645a187cab4c38442c4ed7")
        .end( (error, response) => {
            response.should.have.status(404);
            response.body.should.have.property("messageNotFound");
            response.body.should.have.property("messageNotFound").eq("No se encontro registro(s)");
            done();
        });
    });

    it("GET /Cities Bad Request", (done) => {
        chai.request(server).get("/cities/11")
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });
});

describe("POST Tests Cities",() => {
    let idCity = null;

    it("POST /Cities Bad Request", (done) => {
        const city = {
            nameCity: "  ",
            idState: "  "
        };
        chai.request(server).post("/cities").send(city)
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("POST /Cities Bad Request State", (done) => {
        const city = {
            nameCity: "Veracruz",
            idState: "61645a187cab4c38442c4ed7"
        };
        chai.request(server).post("/cities").send(city)
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("El estado no existe");
            done();
        });
    });

    it("POST /Cities", (done) => {
        const city = {
            nameCity: "Veracruz",
            idState: "61645a187cab4c38442c4ed6"
        };
        chai.request(server).post("/cities").send(city)
        .end( (error, response) => {
            response.should.have.status(201);
            response.body.should.be.a("object");
            response.body.should.have.property("_id");
            response.body.should.have.property("idState");
            response.body.should.have.property("nameCity");
            idCity = response.body._id;
            done();
        });
    });

    after(async () => {
        await Cities.deleteOne({_id:idCity});
    });
});

after(() => {
    server.close();
    mongoose.connection.close();
});