const chai = require("chai");
const chaiHttp = require("chai-http");
const Accounts = require("../src/models/Accounts");
const mongoose = require("mongoose");
const {server} = require("../src/App");
chai.should();
chai.use(chaiHttp);
let accessToken= null;

describe("GET Tests Accounts Filters",() => {
    before((done) => {
        const login = {
            username:"Karla",
	        password:"Marst1245#"
        };
        chai.request(server).post("/login").send(login)
        .end( (error, response) => {
            accessToken = response.body.token;
            done();
        });
    });

    describe("GET Tests Accounts Lastname", () => {
        it("GET /Accounts Lastname", (done) => {
            chai.request(server).get("/accounts/lastname/Ortiz")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
                response.body.length.should.be.eq(2);
                done();
            });
        });

        it("GET /Accounts Lastname Not Found", (done) => {
            chai.request(server).get("/accounts/lastname/Gonzalez")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(404);
                response.body.should.have.property("messageNotFound");
                response.body.should.have.property("messageNotFound").eq("No se encontro registro(s)");
                done();
            });
        });

        it("GET /Accounts Lastname Bad Request", (done) => {
            chai.request(server).get("/accounts/lastname/12352")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(400);
                response.body.should.have.property("messageHappened");
                response.body.should.have.property("messageHappened").eq("Solo se permiten letras y espacios");
                done();
            });
        });
    });

    describe("GET Tests Accounts Name", () => {
        it("GET /Accounts Name", (done) => {
            chai.request(server).get("/accounts/name/Karla")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
                response.body.length.should.be.eq(1);
                done();
            });
        });

        it("GET /Accounts Name Not Found", (done) => {
            chai.request(server).get("/accounts/name/Luisa")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(404);
                response.body.should.have.property("messageNotFound");
                response.body.should.have.property("messageNotFound").eq("No se encontro registro(s)");
                done();
            });
        });

        it("GET /Accounts Name Bad Request", (done) => {
            chai.request(server).get("/accounts/name/12352")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(400);
                response.body.should.have.property("messageHappened");
                response.body.should.have.property("messageHappened").eq("Solo se permiten letras y espacios");
                done();
            });
        });
    });
    
    describe("GET Tests Accounts AGE", () => {
        it("GET /Accounts Age", (done) => {
            chai.request(server).get("/accounts/age/21")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
                response.body.length.should.be.eq(2);
                done();
            });
        });

        it("GET /Accounts Age Not Found", (done) => {
            chai.request(server).get("/accounts/age/14")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(404);
                response.body.should.have.property("messageNotFound");
                response.body.should.have.property("messageNotFound").eq("No se encontro registro(s)");
                done();
            });
        });

        it("GET /Accounts Age Bad Request", (done) => {
            chai.request(server).get("/accounts/age/Martha")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(400);
                response.body.should.have.property("messageHappened");
                response.body.should.have.property("messageHappened").eq("El criterio de la edad debe ser un número");
                done();
            });
        });
    });

    describe("GET Tests Accounts DateBirth", () => {
        it("GET /Accounts DateBirth", (done) => {
            chai.request(server).get("/accounts/dateBirth/2000-07-05")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
                response.body.length.should.be.eq(1);
                done();
            });
        });

        it("GET /Accounts DateBirth Not Found", (done) => {
            chai.request(server).get("/accounts/dateBirth/2000-07-16")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(404);
                response.body.should.have.property("messageNotFound");
                response.body.should.have.property("messageNotFound").eq("No se encontro registro(s)");
                done();
            });
        });

        it("GET /Accounts DateBirth Bad Request", (done) => {
            chai.request(server).get("/accounts/dateBirth/Martha")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(400);
                response.body.should.have.property("messageHappened");
                response.body.should.have.property("messageHappened").eq("La fecha debe tener el formato YYYY-MM-DD");
                done();
            });
        });
    });

    describe("GET Tests Accounts Email", () => {
        it("GET /Accounts Email", (done) => {
            chai.request(server).get("/accounts/email/martha_15_7@outlook.com")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
                response.body.length.should.be.eq(1);
                done();
            });
        });

        it("GET /Accounts Email Not Found", (done) => {
            chai.request(server).get("/accounts/email/martha_15_78@outlook.com")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(404);
                response.body.should.have.property("messageNotFound");
                response.body.should.have.property("messageNotFound").eq("No se encontro registro(s)");
                done();
            });
        });

        it("GET /Accounts Email Bad Request", (done) => {
            chai.request(server).get("/accounts/email/123")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(400);
                response.body.should.have.property("messageHappened");
                response.body.should.have.property("messageHappened").eq("El correo electrónico debería parecerse al ejemplo martha_15_723@outlook.com");
                done();
            });
        });
    });

    describe("GET Tests Accounts Username", () => {
        it("GET /Accounts Username", (done) => {
            chai.request(server).get("/accounts/username/Karla")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
                response.body.length.should.be.eq(1);
                done();
            });
        });

        it("GET /Accounts Username Not Found", (done) => {
            chai.request(server).get("/accounts/username/Karla123")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(404);
                response.body.should.have.property("messageNotFound");
                response.body.should.have.property("messageNotFound").eq("No se encontro registro(s)");
                done();
            });
        });

        it("GET /Accounts Username Bad Request", (done) => {
            chai.request(server).get("/accounts/username/  ")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(400);
                response.body.should.be.a("object");
                response.body.should.have.property("errors");
                done();
            });
        });
    });

    describe("GET Tests Accounts DateCreation", () => {
        it("GET /Accounts DateCreation", (done) => {
            chai.request(server).get("/accounts/dateCreation/2021-09-14")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
                response.body.length.should.be.eq(1);
                done();
            });
        });

        it("GET /Accounts DateCreation Not Found", (done) => {
            chai.request(server).get("/accounts/dateCreation/2021-05-14")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(404);
                response.body.should.have.property("messageNotFound");
                response.body.should.have.property("messageNotFound").eq("No se encontro registro(s)");
                done();
            });
        });

        it("GET /Accounts DateCreation Bad Request", (done) => {
            chai.request(server).get("/accounts/dateCreation/123")
            .auth(accessToken, {type:"bearer"})
            .end( (error, response) => {
                response.should.have.status(400);
                response.body.should.have.property("messageHappened");
                response.body.should.have.property("messageHappened").eq("La fecha debe tener el formato YYYY-MM-DD");
                done();
            });
        });
    });
});

describe("GET Tests Accounts",() => {
    before((done) => {
        const login = {
            username:"Karla",
	        password:"Marst1245#"
        };
        chai.request(server).post("/login").send(login)
        .end( (error, response) => {
            accessToken = response.body.token;
            done();
        });
    });

    it("GET /Accounts", (done) => {
        chai.request(server).get("/accounts")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(200);
            response.body.should.be.a("array");
            response.body.length.should.be.eq(3);
            done();
        });
    });
});

describe("GET Tests Account",() => {
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

    it("GET /Accounts/ID", (done) => {
        chai.request(server).get("/accounts/6196ae217efa096f5c673a9f")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.should.have.property("_id");
            response.body.should.have.property("name");
            response.body.should.have.property("lastname");
            response.body.should.have.property("age");
            response.body.should.have.property("dateBirth");
            response.body.should.have.property("email");
            response.body.should.have.property("username");
            response.body.should.have.property("password");
            response.body.should.have.property("role");
            response.body.should.have.property("idCity");
            done();
        });
    });

    it("GET /Accounts/ID Not Found", (done) => {
        chai.request(server).get("/accounts/6164db5823242f430c487fcb")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(404);
            response.body.should.have.property("messageNotFound");
            response.body.should.have.property("messageNotFound").eq("No se encontro registro(s)");
            done();
        });
    });

    it("GET /Accounts/ID Bad Request", (done) => {
        chai.request(server).get("/accounts/6343455")
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });
});

describe("POST Tests Accounts",() => { 
    let idAccount = null;

    it("POST /Accounts Bad Request All", (done) => {
        const account = {};
        chai.request(server).post("/accounts").send(account)
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });
    
    it("POST /Accounts Bad Request Name", (done) => {
        const account = {
            lastname:354,
	        name:123,
	        age:21,
	        dateBirth:"2000-08-05",
	        email:"miroslava_19_7@outlook.es",
	        username:"Miroslava123",
	        password:"Mmol180515#",
	        role:"user",
	        idCity:"61645a7c0879b0c15c7116f7"
        };
        chai.request(server).post("/accounts").send(account)
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("POST /Accounts Bad Request Age", (done) => {
        const account = {
            lastname:"Ortiz",
	        name:"Miroslava",
	        age:"13",
	        dateBirth:"2000-08-05",
	        email:"miroslava_19_7@outlook.es",
	        username:"Miroslava123",
	        password:"Mmol180515#",
	        role:"user",
	        idCity:"61645a7c0879b0c15c7116f7"
        };
        chai.request(server).post("/accounts").send(account)
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("POST /Accounts Bad Request DateBirth", (done) => {
        const account = {
            lastname:"Ortiz",
	        name:"Miroslava",
	        age: 13,
	        dateBirth:"2021/08/05",
	        email:"miroslava_19_7@outlook.es",
	        username:"Miroslava123",
	        password:"Marst1245#",
	        role:"user",
	        idCity:"61645a7c0879b0c15c7116f7"
        };
        chai.request(server).post("/accounts").send(account)
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("POST /Accounts Bad Request Email", (done) => {
        const account = {
            lastname:"Ortiz",
	        name:"Miroslava",
	        age:13,
	        dateBirth:"2000-08-05",
	        email:"Martha",
	        username:"Miroslava123",
	        password:"Mmol180515#",
	        role:"user",
	        idCity:"61645a7c0879b0c15c7116f7"
        };
        chai.request(server).post("/accounts").send(account)
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("POST /Accounts Bad Request City", (done) => {
        const account = {
            lastname:"Ortiz",
	        name:"Miroslava",
	        age:13,
	        dateBirth:"2000-08-05",
	        email:"miroslava_19_7@outlook.es",
	        username:"Miroslava123",
	        password:"Mmol180515#",
	        role:"user",
	        idCity:"61645a7c0879b0c15c7116f5"
        };
        chai.request(server).post("/accounts").send(account)
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("La ciudad no existe");
            done();
        });
    });

    it("POST /Accounts", (done) => {
        const account = {
            lastname:"Ortiz",
	        name:"Miroslava",
	        age:13,
	        dateBirth:"2000-08-05",
	        email:"miroslava_19_7@outlook.es",
	        username:"Miroslava123",
	        password:"Mmol180515#",
	        role:"user",
	        idCity:"61645a7c0879b0c15c7116f7"
        };
        chai.request(server).post("/accounts").send(account)
        .end( (error, response) => {
            response.should.have.status(201);
            response.body.should.be.a("object");
            response.body.should.have.property("_id");
            response.body.should.have.property("name");
            response.body.should.have.property("lastname");
            response.body.should.have.property("age");
            response.body.should.have.property("dateBirth");
            response.body.should.have.property("email");
            response.body.should.have.property("username");
            response.body.should.have.property("password");
            response.body.should.have.property("role");
            response.body.should.have.property("idCity");
            idAccount = response.body._id;
            done();
        });
    });


    it("POST /Accounts Duplicate", (done) => {
        const account = {
            lastname: "Ortiz",
	        name: "Miroslava",
	        age: 13,
	        dateBirth: "2000-08-05",
	        email: "miroslava_19_7@outlook.es",
	        username: "Miroslava123",
	        password: "Mmol180515#",
	        role: "user",
	        idCity: "61645a7c0879b0c15c7116f7"
        };
        chai.request(server).post("/accounts").send(account)
        .end( (error, response) => {
            response.should.have.status(409);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("Existe una cuenta con el mismo nombre de usuario o correo");
            done();
        });
    });

    after(async () => {
        await Accounts.deleteOne({_id:idAccount});
    });
});

describe("PUT Tests Accounts",() => {
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

    it("PUT /Accounts Bad Request All", (done) => {
        const account = {};
        chai.request(server).put("/accounts").send(account)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });
    
    it("PUT /Accounts Bad Request Name", (done) => {
        const account = {
            _id: "6168cf9563929f8f000c7614",
            lastname: 354,
	        name: 123,
	        age: 21,
	        dateBirth: "2000-08-05",
	        email: "miroslava_17_7@outlook.es",
	        username: "Miros3423",
	        idCity: "61645a7c0879b0c15c7116f7"
        };
        chai.request(server).put("/accounts").send(account)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("PUT /Accounts Bad Request Age", (done) => {
        const account = {
            _id: "6168cf9563929f8f000c7614",
            lastname: "Ortiz",
	        name: "Miroslava",
	        age: "13",
	        dateBirth: "2000-08-05",
	        email: "miroslava_17_7@outlook.es",
	        username: "Miros3423",
	        idCity: "61645a7c0879b0c15c7116f7"
        };
        chai.request(server).put("/accounts").send(account)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("PUT /Accounts Bad Request DateBirth", (done) => {
        const account = {
            _id: "6168cf9563929f8f000c7614",
            lastname: "Ortiz",
	        name: "Miroslava",
	        age: 13,
	        dateBirth: "2021/08/05",
	        email: "miroslava_17_7@outlook.es",
	        username: "Miros3423",
	        idCity: "61645a7c0879b0c15c7116f7"
        };
        chai.request(server).put("/accounts").send(account)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("PUT /Accounts Bad Request Email", (done) => {
        const account = {
            _id: "6168cf9563929f8f000c7614",
            lastname: "Ortiz",
	        name: "Miroslava",
	        age: 13,
	        dateBirth: "2000-08-05",
	        email: "Martha",
	        username: "Miros3423",
	        idCity: "61645a7c0879b0c15c7116f7"
        };
        chai.request(server).put("/accounts").send(account)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errors");
            done();
        });
    });

    it("PUT /Accounts Bad Request City", (done) => {
        const account = {
            _id: "6168cf9563929f8f000c7614",
            lastname: "Ortiz",
	        name: "Miroslava",
	        age: 13,
	        dateBirth: "2000-08-05",
	        email: "miroslava_17_7@outlook.es",
	        username: "Miros3423",
	        idCity: "61645a7c0879b0c15c7116f5"
        };
        chai.request(server).put("/accounts").send(account)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(400);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("La ciudad no existe");
            done();
        });
    });

    it("PUT /Accounts", (done) => {
        const account = {
            _id: "6168cf9563929f8f000c7614",
            lastname: "Gomez",
	        name: "María",
	        age: 13,
	        dateBirth: "2000-08-03",
	        email: "miroslava_17_8@outlook.es",
	        username: "Miros3423",
	        idCity: "61645a7c0879b0c15c7116f7"
        };
        chai.request(server).put("/accounts").send(account)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(200);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("La cuenta se edito exitosamente");
            done();
        });
    });


    it("PUT /Accounts Duplicate", (done) => {
        const account = {
            _id: "6168cf9563929f8f000c7614",
            lastname: "Ortiz",
            name: "Miroslava",
            age: 21,
            dateBirth: "2000-08-05",
            email: "martha_15_7@outlook.com",
            username: "Karla",
            idCity: "61645a7c0879b0c15c7116f7"
        };
        chai.request(server).put("/accounts").send(account)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(409);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("Existe otra cuenta con el mismo nombre de usuario o correo");
            done();
        });
    });

    after((done) => {
        const account = {
            _id: "6168cf9563929f8f000c7614",
            lastname: "Ortiz",
            name: "Miroslava",
            age: 21,
            dateBirth: "2000-08-05",
            email: "miroslava_15_7@outlook.es",
            username: "MiroStar",
            idCity: "61645a7c0879b0c15c7116f7"
        };
        chai.request(server).put("/accounts").send(account)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            done();
        });
    });
});

describe("PATCH Tests Account", () => {
    before((done) => {
        const login = {
            username:"Karla",
	        password:"Marst1245#"
        };
        chai.request(server).post("/login").send(login)
        .end( (error, response) => {
            accessToken = response.body.token;
            done();
        });
    });

    it("PATCH /Accounts", (done) => {
        const account = {
            _id:"6168cf9563929f8f000c7614",
	        status:1
        };
        chai.request(server).patch("/accounts").send(account)
        .auth(accessToken, {type:"bearer"})
        .end( (error, response) => {
            response.should.have.status(200);
            response.body.should.have.property("messageHappened");
            response.body.should.have.property("messageHappened").eq("La cuenta cambio su estado exitosamente");
            done();
        });
    });

    it("PATCH /Accounts Bad Request", (done) => {
        const account = {
            _id: "616err",
	        status: 1
        };
        chai.request(server).patch("/accounts").send(account)
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