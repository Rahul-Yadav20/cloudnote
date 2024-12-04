const mongoose = require('mongoose');

// Mongo Database connection URI
// CloudNotebook is the database
// automatically created in mongodb when you insert a document
const mongoUri = 'mongodb+srv://rahulydv0927:2rsyME20MIbHzYyp@cluster0.wwmt31v.mongodb.net/CloudNotebook';

const connectFunction = () => {

    // Connect method ( takes a database URI as parameter)
    mongoose.connect(mongoUri);
    console.log("Conneciton Established...");
}

module.exports = connectFunction;
