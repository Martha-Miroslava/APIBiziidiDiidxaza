require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const {dataBaseConnect} = require("./connection/ConnectionDB");
const upload = require("express-fileupload");
const helmet = require("helmet");
const cors = require("cors");

app.set("port", process.env.PORT);
app.disable("x-powered-by");
app.use(helmet());
app.use(cors());
app.disable("etag");


app.use(morgan("dev"));
app.use(upload());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(require("./routers/Account"));
app.use(require("./routers/Login"));
app.use(require("./routers/City"));
app.use(require("./routers/State"));
app.use(require("./routers/Report"));
app.use(require("./routers/Discussion"));
app.use(require("./routers/Comment"));
app.use(require("./routers/Email"));
app.use(require("./routers/Resource"));
app.use(require("./routers/Lesson"));
app.use(require("./routers/Question"));
app.use(require("./routers/Answer"));
app.use(require("./routers/LessonRecord"));

dataBaseConnect();

const server = app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});

module.exports = {server};
