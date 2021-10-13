const mongoose = require('mongoose');

// Connection the dataBase
const dataBaseConnect = () => {
    const URI = process.env.URI;
    mongoose.connect(
        URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(database => console.log('**** CORRECT CONNECTION ****'))
    .catch(error => console.log('***** CONNECTION ERROR ****', error.message));
}

module.exports = { dataBaseConnect }