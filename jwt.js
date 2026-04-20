const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {

    // Extract the jwt token from the req headers
    const token = req.headers.authorization.split(' ')[1];

    // if token is not found
    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

// if token is found then
try{
    // Verify the jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attetch user information  to the request object
    req.userPayload = decoded;
    next();
}
catch(err){
    console.log(err);
    res.status(401).json({
        message: "Invalid token"
    })
 }
}

// here create function to generate jwt token

const generateToken = (userData) => {
    // Generate a new jwt token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 50000});
}

module.exports = {jwtAuthMiddleware, generateToken};