const mongoose = require("mongoose");
const {logError} = require("../helpers/logError");

const{NODE_ENV, URI_PRODUCTION, URI_TEST, NODE_TEST, URI_TEST_FRONTEND} = process.env;

const dataBaseConnect = async () => {
    const URI = NODE_ENV === "test"
    ? NODE_TEST === "frontend"
        ? URI_TEST_FRONTEND
        : URI_TEST
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