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

   

    const token = setUser(user);



    res.cookie('uid',token);


    return res.redirect("/");
}


module.exports = { handelUserSignUp,handelUserLogin }