const Reports = require("../src/models/reports");
const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const {server} = require("../src/app");
chai.should();
chai.use(chaiHttp);
let accessToken= null;

describe("GET Tests Reports Filters",() => {
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

    describe("GET Tests Reports usernameAccount", () => {
        it("GET /Reports usernameAccount", (done) => {
            chai.request(server).get("/reports/usernameAccount/MiroStar")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
                response.body.length.should.be.eq(2);
                done();
            });
        });

        it("GET /Reports usernameAccount Not Found", (done) => {
            chai.request(server).get("/reports/usernameAccount/Gonzalez")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(404);
                response.body.should.have.property("messageNotFound");
                response.body.should.have.property("messageNotFound").eq("No se encontro registro(s)");
                done();
            });
        });

        it("GET /Reports usernameAccount Bad Request", (done) => {
            chai.request(server).get("/reports/usernameAccount/&###%5")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(400);
                response.body.should.have.property("message");
                response.body.should.have.property("message").eq("Solo letras de la A a la Z y números. Caracteres de 3 a 20");
                done();
            });
        });
    });

    describe("GET Tests Reports usernameReported", () => {
        it("GET /Reports usernameReported", (done) => {
            chai.request(server).get("/reports/usernameReported/Miroslava25")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
                response.body.length.should.be.eq(2);
                done();
            });
        });
    
        it("GET /Reports usernameReported Not Found", (done) => {
            chai.request(server).get("/reports/usernameReported/Francisco")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(404);
                response.body.should.have.property("messageNotFound");
                response.body.should.have.property("messageNotFound").eq("No se encontro registro(s)");
                done();
            });
        });
    
        it("GET /Reports usernameReported Bad Request", (done) => {
            chai.request(server).get("/reports/usernameReported/&###%5")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(400);
                response.body.should.have.property("message");
                response.body.should.have.property("message").eq("Solo letras de la A a la Z y números. Caracteres de 3 a 20");
                done();
            });
        });
    });

    describe("GET Tests Reports DateCreation", () => {
        it("GET /Reports DateCreation", (done) => {
            chai.request(server).get("/reports/dateCreation/2021-10-15")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
                response.body.length.should.be.eq(2);
                done();
            });
        });
    
        it("GET /Reports DateCreation Not Found", (done) => {
            chai.request(server).get("/reports/dateCreation/2021-05-17")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(404);
                response.body.should.have.property("messageNotFound");
                response.body.should.have.property("messageNotFound").eq("No se encontro registro(s)");
                done();
            });
        });
    
        it("GET /Reports DateCreation Bad Request", (done) => {
            chai.request(server).get("/reports/dateCreation/Martha")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(400);
                response.body.should.have.property("message");
                response.body.should.have.property("message").eq("La fecha debe tener el formato YYYY-MM-DD");
                done();
            });
        });
    });
});

describe("GET Tests Reports",() => {
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

    it("GET /Reports", (done) => {
        chai.request(server).get("/reports")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(200);
            response.body.should.be.a("array");
            response.body.length.should.be.eq(2);
            done();
        });
    });
});

describe("GET Tests Report",() => {
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

    it("GET /Reports/ID", (done) => {
        chai.request(server).get("/reports/6169cc2ca32bd265c102ff31")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.should.have.property("_id");
            response.body.should.have.property("reason");
            response.body.should.have.property("context");
            response.body.should.have.property("idAccount");
            response.body.should.have.property("dateCreation");
            response.body.should.have.property("accountReported");
            done();
        });
    });

    it("GET /Reports/ID Not Found", (done) => {
        chai.request(server).get("/reports/616b0efeba862c9a697da9dc")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(404);
            response.body.should.have.property("messageNotFound");
            response.body.should.have.property("messageNotFound").eq("No se encontro registro(s)");
            done();
        });
    });

    it("GET /Reports/ID Bad Request", (done) => {
        chai.request(server).get("/reports/616b0efeba862c9a697")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });
});

describe("POST Tests Report",() => {
    let idReport = null;
    
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

    it("POST /Reports", (done) => {
        const report = {
            reason:"Malas pralabras en su comentario",
	        context:"La discusion tiene mañanita comentarios malos por parte de este usuario",
	        idAccount:"6168cf9563929f8f000c7614",
	        accountReported:"6196ae217efa096f5c673a9f"
        };
        chai.request(server).post("/reports").send(report)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(201);
            response.body.should.be.a("object");
            response.body.should.have.property("_id");
            response.body.should.have.property("reason");
            response.body.should.have.property("context");
            response.body.should.have.property("idAccount");
            response.body.should.have.property("dateCreation");
            response.body.should.have.property("accountReported");
            idReport = response.body._id;
            done();
        });
    });

    it("POST /Reports Bad Request", (done) => {
        const report = {
            reason: "          ",
	        context: "        ",
	        idAccount: 3233,
	        accountReported: 61620
        }
        chai.request(server).post("/reports").send(report)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("POST /Reports Bad Request Account", (done) => {
        const report = {
            reason:"Malas pralabras en su comentario",
	        context:"La discusion tiene muchos comentarios malos por parte de este usuario",
	        idAccount:"6168cf9563929f8f000b7618",
	        accountReported:"6168d4975471a4bcc2b17445"
        }
        chai.request(server).post("/reports").send(report)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("La cuenta o cuentas no existen");
            done();
        });
    });

    after(async () => {
        await Reports.deleteOne({_id:idReport});
    });
});

after(() => {
    server.close();
    mongoose.connection.close();
});
