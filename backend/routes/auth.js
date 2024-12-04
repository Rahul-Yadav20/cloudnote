const express = require('express');
const User = require('../models/User');
const fetchUser = require('../middleware/fetchUser');

// The bcrypt package in Node.js is a library used for securely hashing passwordsr
const bcrypt = require('bcryptjs');

// JWTs are used for authentication, the server creates a JWT after a user successfully logs in
// JWTs consist of three parts separated by dots (.): the header, the payload, and the signature
const jwt = require('jsonwebtoken');

// JWT sign method take the secret as second argument
const jwt_secret = "this is my secret";

// express-validator is used to validate the request data
const { body, validationResult } = require('express-validator');


// console.log(process.env.JWT_SECRET);
// express router for mapping different routes with req
const router = express.Router();

// Route1 -> Creating a User using POST - *endpoint /api/auth/createUser* (without using Authentication)
router.post('/createUser', [
    body('name', 'Password must be 3 characters').isLength({ min: 3 }),
    body('email', 'Enter a valid mail').isEmail(),
    body('password', 'Password must be 5 characters').isLength({ min: 6 })
], async (req, res) => {
    // console.log(body());

    // Validating the errors from request body
    const err = validationResult(req);

    // if error occurs
    if (!err.isEmpty()) {
        return res.status(400).json({ err: err.array() });
    }

    try {
        // finding email if already exists
        let user = await User.findOne({ email: req.body.email })

        // if user exists, send error as response
        if (user) {
            return res.status(400).json({ error: "User is already exist with this mail" })
        }

        // The number 10 passed as an argument to genSalt is called the cost factor
        // It controls how computationally expensive it is to generate the hash. 
        let salt = await bcrypt.genSalt(10);

        // hash() takes two argument, first is data to be hash and ssecond is salt 
        let encyptedPass = await bcrypt.hash(req.body.password, salt);

        // if no errors, create users (fields) in CloudNotebook database
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: encyptedPass
        })


        // This is payload which will be decoded using JWT verify (see fetchUser middleware)
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, jwt_secret);

        // send responed which user is created
        res.json({ authToken });

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server erro!");
    }

})


// Route2 -> Authenticate a user with email - *endpoint /api/aut/login* (Using jwt token)
router.post('/login', [
    body('email', 'Enter a valid mail').isEmail(),
    body('password', "Password can't empty").exists()
], async (req, res) => {
    // console.log(body());

    // Validating the errors from request body
    const err = validationResult(req);
    let success = false;

    // if error occurs
    if (!err.isEmpty()) {
        return res.status(400).json({success, err: err.array() });
    }

    try {

        // Destructuring mail and password from request body
        const { email, password } = req.body;

        // similiar like User.findOne(email: req.body.email);
        // findOne() method fetch user object or data when mail will match
        let user = await User.findOne({ email });


        // if user not exist 
        if (!user) {
            success = false;
            
            return res.status(400).json("Email is not registered, Please Signup !");
        }


        // compare takes two argument, first is data which you to compare 
        // second is the data from which to be compare (e.g. user.password is the hashed or crypted pass in database)
        let comparePass = await bcrypt.compare(password, user.password);

        if (!comparePass) {
            success = false;
            return res.status(400).json("Invalid credential");
        }

        // it's payload or the data for sign() method of JWT
        // this payload data will be retrive when you decode it using verify() method (see fetchUser middleware)
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, jwt_secret);
        success = true;

        // send responed which user is created
        // this is same as json({authToken: authToken})
        res.json({success, authToken });


    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server erro!");
    }

})


// Route3 -> Get the data of Authenticated user - *endpoint /api/auth/getUser *
router.post("/getUser", fetchUser, async (req, res) => {
    try {
        // req.user is coming from fetchUser middleware
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error!");
    }

})




module.exports = router;