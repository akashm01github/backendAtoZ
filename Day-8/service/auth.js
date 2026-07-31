const sessionIToUserMap = new Map();

function setUser(id,user){
    sessionIToUserMap.set(id,user);
}

function getUser(id){
    return  sessionIToUserMap.get(id);
}

module.exports = {setUser,getUser}


