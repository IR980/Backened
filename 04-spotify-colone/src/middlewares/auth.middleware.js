const jwt = require("jsonwebtoken")

async function authArtist(req, res, next) {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "unauthorized"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role !== "artist"){
            return res.status(403).json({
                message: "you don't have an access to create an album music"
            })
        }

        req.user = decoded;

        next()

    }catch(err){
        console.log(err)
        return res.status(401).json({
            message: "unauthorized"
        })
    }
    
}

async function authUser(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "unathorized"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role !== "user"){
            return res.status(403).json({
                message: "you dont have a access to create a album or musics"
            })
        }

        req.user = decoded
        next();

    }catch(err){
        console.log(err);
        return res.status(401).json({
            message: "unathorized"
        })   
    }
}
module.exports = {authArtist, authUser};