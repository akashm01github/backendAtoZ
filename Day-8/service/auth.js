const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "akash2001mukherjee"

function setUser(user){
    return jwt.sign({
        _id:user.id,
        email:user.email
    },JWT_SECRET_KEY);
}

function getUser(token){

    if(!token){
        return null;
    }
    return  jwt.verify(token,JWT_SECRET_KEY);
}

module.exports = {setUser,getUser}


