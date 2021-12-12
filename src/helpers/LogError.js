const path = require("path");
const fileSystem = require("fs");

const logError = async (errorCurrent) => {
    const dateNow = new Date();
    const date = new Date(dateNow.getTime() - (dateNow.getTimezoneOffset() * 60000 )).toISOString().slice(0, 10);
    const time = dateNow.toLocaleTimeString();
    const pathLog = "../logs/log-" + date + ".txt";
    const newContent = "Time: " +time+"\nError: "+errorCurrent+"\n";
    fileSystem.appendFileSync(path.join(__dirname,pathLog),newContent);
};

module.exports = {logError};