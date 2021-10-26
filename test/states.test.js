const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const {server} = require("../src/app");
chai.should();
chai.use(chaiHttp);

describe("Tests States",() => {
    it("GET /States", (done) => {
       chai.request(server).get("/states")
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
