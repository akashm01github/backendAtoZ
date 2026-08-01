const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
    const usserId = req.cookies?.uid;

    if (!usserId) {
        return res.redirect("/login");
    }

    const user = getUser(usserId);

    if (!user) {
        return res.redirect("/login");
    }

    req.user = user;

    next();
}


async function checkAuth(req, res, next) {

    const usserId = req.cookies.uid;

    const user = getUser(usserId);

    req.user = user;

    next();
}

module.exports = { restrictToLoggedInUserOnly,checkAuth }