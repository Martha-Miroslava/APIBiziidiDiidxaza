const getExpeditiousCache = require("express-expeditious");


const defaultOptions = {
    namespace: "expresscache",
    defaultTtl: "1 minute",
    statusCodeExpires: {
        500: 0,
        404: "1 minute"
    }
};

const cacheInit = getExpeditiousCache(defaultOptions);

module.exports = {cacheInit};