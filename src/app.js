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
app.use(require("./routers/account"));
app.use(require("./routers/login"));
app.use(require("./routers/city"));
app.use(require("./routers/state"));
app.use(require("./routers/report"));
app.use(require("./routers/discussion"));
app.use(require("./routers/comment"));
app.use(require("./routers/email"));
app.use(require("./routers/resource"));
app.use(require("./routers/lesson"));
app.use(require("./routers/question"));
app.use(require("./routers/answer"));
app.use(require("./routers/lessonRecord"));

dataBaseConnect();

const server = app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});

module.exports = {server};