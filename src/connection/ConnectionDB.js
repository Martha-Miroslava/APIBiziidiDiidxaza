const mongoose = require("mongoose");
const {logError} = require("../helpers/log-error");

const{NODE_ENV, URI_PRODUCTION, URI_TEST} = process.env;

const dataBaseConnect = async () => {
    const URI = NODE_ENV === "test"
    ? URI_TEST
    : URI_PRODUCTION;
    await mongoose.connect(
        URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((database) => {console.log("**** CORRECT CONNECTION ****");})
    .catch((error) => {
        logError(error);
        console.log("***** CONNECTION ERROR ****");
    });
};

module.exports = {dataBaseConnect};