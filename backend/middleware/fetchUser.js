const jwt = require('jsonwebtoken');
const jwt_secret = "this is my secret";
const fetchUser = (req, res, next) => {

    // Accessing JWT token from header
    const token = req.header("auth-token");

    if (!token) {
        return res.status(401).send("Unauthorised Access")
    }

    try {

        // decoding the JWT token
        // after the payload data store in data variable
        const data = jwt.verify(token, jwt_secret);

        // console.log(data);

        // data have the user object and that user object have id of that logged-in user
        req.user = data.user;

        // next will call the next function or middleware after fecthUser execution
        next();

    } catch (error) {
        res.status(500).send("Internal Server error")
    }

}

module.exports = fetchUser;