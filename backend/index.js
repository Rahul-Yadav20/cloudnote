const connectToMongo = require('./database.js');
const express = require('express')
const cors = require('cors')
// require("dotenv").config();
// calling the connectToMongo function to connect mongoDB
connectToMongo();


const app = express();
const port = 5000;

app.use(cors());
// app.use(express.json()) is middleware that parses incoming request bodies in JSON format
app.use(express.json());


// Routes for notes and users
app.use("/api/auth", require('./routes/auth'))
app.use("/api/notes", require('./routes/notes'))

// listen method takes two parameters, first is port number, and callback function   
app.listen(port, () => {
    console.log(`Server is listening at ${port}`);
})