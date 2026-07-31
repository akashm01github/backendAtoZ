const userModel = require("../model/user.model");

const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");



const handelUserSignUp = async (req, res) => {
    const { userName, email, password } = req.body;

    const user = await userModel.create({
        userName,
        email,
        password
    })


    return res.redirect("/");
}


const handelUserLogin = async (req, res) => {
    const {email, password } = req.body;

    const user = await userModel.findOne({
        email,
        password
    })


    if(!user){
        return res.render("login");
    }

    const sessionId = uuidv4();

    setUser(sessionId,user);

    res.cookie('uid',sessionId);


    return res.render("home");
}


module.exports = { handelUserSignUp,handelUserLogin }