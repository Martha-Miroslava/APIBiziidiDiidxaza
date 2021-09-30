const mongoose = require('mongoose');

// Connection the dataBase
const dataBaseConnect = () => {
    const URI = process.env.URI;
    mongoose.connect(
        URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(db => console.log('**** CORRECT CONNECTION ****'))
    .catch(err => console.log('***** CONNECTION ERROR ****', err));
}

module.exports = { dataBaseConnect }