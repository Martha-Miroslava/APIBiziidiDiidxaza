const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const {server} = require("../src/App");
const Discussions = require("../src/models/Discussions");
const Accounts = require("../src/models/Accounts");
chai.should();
chai.use(chaiHttp);
let accessToken= null;
let idDiscussion = null;

describe("POST Tests Discussion",() => {
    before((done) => {
        const login = { username: "MiroStar", password: "Marst1245#"};
        chai.request(server).post("/login").send(login)
        .end( (error, response) => {
            accessToken = response.body.token;
            done();
        });
    });

    it("POST /Discussions", (done) => {
        const discussion = {
            title: "¿Qué opinan de los canciones en zapoteco?",
            comment: "Me gustaría saber que opinan de los canciones que esta y donde puede encontrar más",
            theme: "duda",
            idAccount: "6168cf9563929f8f000c7614"
        };
        chai.request(server).post("/discussions").send(discussion)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(201);
            response.body.should.be.a("object");
            response.body.should.have.property("_id");
            response.body.should.have.property("comment");
            response.body.should.have.property("title");
            response.body.should.have.property("theme");
            response.body.should.have.property("idAccount");
            response.body.should.have.property("dateCreation");
            response.body.should.have.property("status");
            idDiscussion = response.body._id;
            done();
        });
    });

    it("POST /Discussions Bad Request", (done) => {
        const discussion = {
            title: "   ",
            comment: " ",
            theme: "informacion",
            idAccount: "6168cf"
        }
        chai.request(server).post("/discussions").send(discussion)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("POST /Discussions Bad Request Account", (done) => {
        const discussion = {
            title: "¿Qué opinan de los canciones en zapoteco?",
            comment: "Me gustaría saber que opinan de los canciones que esta y donde puede encontrar más",
            theme: "duda",
            idAccount: "6168cf9563929f8f000c7679"
        }
        chai.request(server).post("/discussions").send(discussion)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("La cuenta no existe");
            done();
        });
    });
});

describe("GET Tests Discussions Filters",() => {
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

    it("GET /Discussions News", (done) => {
        chai.request(server).get("/discussions/filters/news")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(200);
            response.body.should.be.a("array");
            response.body.length.should.be.eq(1);
            done();
        });
    });

    it("GET /Discussions Populars", (done) => {
        chai.request(server).get("/discussions/filters/populars")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(200);
            response.body.should.be.a("array");
            response.body.length.should.be.eq(1);
            done();
        });
    });

    after(async () => {
        await Discussions.deleteOne({_id:idDiscussion});
    });
});

describe("GET Tests Discussions Filters Criterion",() => {
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

    it("GET /Discussions Title", (done) => {
        chai.request(server).get("/discussions/title/¿Qué opinan")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(200);
            response.body.should.be.a("array");
            response.body.length.should.be.eq(2);
            done();
        });
    });

    it("GET /Discussions Title Not Found", (done) => {
        chai.request(server).get("/discussions/title/Canciones")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(404);
            response.body.should.have.property("messageNotFound");
            response.body.should.have.property("messageNotFound").eq("No se encontro registro(s)");
            done();
        });
    });

    it("GET /Discussions Title Bad Request", (done) => {
        chai.request(server).get("/discussions/title/    ")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("GET /Discussions Tracing", (done) => {
        chai.request(server).get("/discussions/tracing/6168cf9563929f8f000c7614")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(200);
            response.body.should.be.a("array");
            response.body.length.should.be.eq(1);
            done();
        });
    });

    it("GET /Discussions Tracing Not Found", (done) => {
        chai.request(server).get("/discussions/tracing/6168d4975471a4bcc2b17446")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(404);
            response.body.should.have.property("messageNotFound");
            response.body.should.have.property("messageNotFound").eq("No se encontro registro(s)");
            done();
        });
    });

    it("GET /Discussions Tracing Bad Request", (done) => {
        chai.request(server).get("/discussions/tracing/6168cf9")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });
});

describe("GET Tests Discussion",() => {
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

    it("GET /Discussions/ID", (done) => {
        chai.request(server).get("/discussions/618dc7899d06f2345c3ee84b")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.should.have.property("_id");
            response.body.should.have.property("comment");
            response.body.should.have.property("title");
            response.body.should.have.property("theme");
            response.body.should.have.property("idAccount");
            response.body.should.have.property("dateCreation");
            response.body.should.have.property("status");
            done();
        });
    });

    it("GET /Discussions/ID Not Found", (done) => {
        chai.request(server).get("/discussions/616b0efeba862c9a697da9dc")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(404);
            response.body.should.have.property("messageNotFound");
            response.body.should.have.property("messageNotFound").eq("No se encontro registro(s)");
            done();
        });
    });

    it("GET /Discussions/ID Bad Request", (done) => {
        chai.request(server).get("/discussions/616b0efeba862c9a697")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });
});

describe("GET Tests Discussions",() => {
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

    it("GET /Discussions", (done) => {
        chai.request(server).get("/discussions")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(200);
            response.body.should.be.a("array");
            response.body.length.should.be.eq(2);
            done();
        });
    });
});

describe("PATCH Tests Discussion",() => {
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

    it("PATCH /Discussion", (done) => {
        const discussion = {
            _id: "618dc7969d06f2345c3ee84c",
            idAccount: "6196ae217efa096f5c673a9f"
        }
        chai.request(server).patch("/discussions").send(discussion)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(200);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("La discusión se segui exitosamente");
            done();
        });
    });

    it("PATCH /Discussion Bad Request Account", (done) => {
        const discussion = {
            _id: "616b0efeba862c9a697da9db",
            idAccount: "6168d4975471a4bcc2b17443"
        }
        chai.request(server).patch("/discussions").send(discussion)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("La cuenta no existe");
            done();
        });
    });

    it("PATCH /Discussion Bad Request Discussion", (done) => {
        const discussion = {
            _id: "616b0efeba862c9a697da9cf",
            idAccount: "6196ae217efa096f5c673a9f"
        }
        chai.request(server).patch("/discussions").send(discussion)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("La discusión no existe");
            done();
        });
    });

    it("PATCH /Discussion Bad Request", (done) => {
        const discussion = {
            _id: "616b0e",
            idAccount: "6168d4975"
        }
        chai.request(server).patch("/discussions").send(discussion)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    after(async () => {
        const account = new Accounts ();
        await Accounts.updateOne({_id:"6196ae217efa096f5c673a9f"}, { discussions: account.discussions});
    });
});

after(() => {
    server.close();
    mongoose.connection.close();
});