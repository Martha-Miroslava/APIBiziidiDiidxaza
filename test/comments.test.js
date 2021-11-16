const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const {server} = require("../src/app");
chai.should();
chai.use(chaiHttp);
let accessToken= null;
let idComment= null;

describe("GET Tests Comments ID discussion",() => {
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

    it("GET /Comments", (done) => {
        chai.request(server).get("/comments/616b0efeba862c9a697da9db")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(200);
            response.body.should.be.a("array");
            response.body.length.should.be.eq(2);
            done();
        });
    });

    it("GET /Comments Not Found", (done) => {
        chai.request(server).get("/comments/616b0efeba862c9a697da9dc")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(404);
            response.body.should.have.property("message");
            response.body.should.have.property("message").eq("No se encontro registro(s)");
            done();
        });
    });

    it("GET /Comments Bad Request", (done) => {
        chai.request(server).get("/comments/616b0efeb")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });
});

describe("POST Tests Comments",() => {
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

    it("POST /Comments", (done) => {
        const comment = {
            comment: "Creo que los cuentos son un poco largos", 
            idAccount: "6168cf9563929f8f000c7614", 
            idDiscussion: "618dc7969d06f2345c3ee84c"
        };
        chai.request(server).post("/comments").send(comment)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(201);
            response.body.should.be.a("object");
            response.body.should.have.property("_id");
            response.body.should.have.property("comment");
            response.body.should.have.property("idAccount");
            response.body.should.have.property("idDiscussion");
            response.body.should.have.property("dateCreation");
            idComment = response.body._id;
            done();
        });
    });

    it("POST /Comments Bad Request Account", (done) => {
        const comment = {
            comment: "Creo que los cuentos son un poco largos", 
            idAccount: "6168cf9563929f8f000c7616", 
            idDiscussion: "616b0efeba862c9a697da9db"
        };
        chai.request(server).post("/comments").send(comment)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("message");
            response.body.should.have.property("message").eq("La cuenta no existe");
            done();
        });
    });

    it("POST /Comments Bad Request Disccussion", (done) => {
        const comment = {
            comment: "Creo que los cuentos son un poco largos", 
            idAccount: "6168cf9563929f8f000c7614", 
            idDiscussion: "616b0efeba862c9a697da9dc"
        };
        chai.request(server).post("/comments").send(comment)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("message");
            response.body.should.have.property("message").eq("La discusion no existe");
            done();
        });
    });

    it("POST /Comments Bad Request", (done) => {
        const comment = {
            comment: "  ", 
            idAccount: "6168cf94", 
            idDiscussion: "616b0efeba86"
        };
        chai.request(server).post("/comments").send(comment)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });
});

describe("DELETE Tests Comments",() => {
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

    it("DELETE /Comments", (done) => {
        const comment = {
            _id: idComment,
            idDiscussion: "618dc7969d06f2345c3ee84c"
        };
        chai.request(server).delete("/comments").send(comment)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(200);
            response.body.should.have.property("message");
            response.body.should.have.property("message").eq("El comentario se eliminó exitosamente");
            done();
        });
    });

    it("DELETE /Comments Bad Request", (done) => {
        const comment = {
            _id: "616b4ae0609441"
        };
        chai.request(server).delete("/comments").send(comment)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });
});


after(() => {
    server.close();
    mongoose.connection.close();
});