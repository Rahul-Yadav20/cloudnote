const mongoose = require('mongoose');

// Mongo Database connection URI
// CloudNotebook is the database
// automatically created in mongodb when you insert a document
const mongoUri = 'mongodb://localhost:27017/CloudNotebook';

const connectFunction = () => {

    // Connect method ( takes a database URI as parameter)
    mongoose.connect(mongoUri);
    console.log("Conneciton Established...");
}

module.exports = connectFunction;
