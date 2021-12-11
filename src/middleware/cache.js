const getExpeditiousCache = require("express-expeditious");


const defaultOptions = {
    namespace: "expresscache",
    defaultTtl: 60 * 50,
    statusCodeExpires: {
        500: 0,
        404: 60 * 50
    }
};

const cacheInit = getExpeditiousCache(defaultOptions);

module.exports = {cacheInit};