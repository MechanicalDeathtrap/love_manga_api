import jwt from "jsonwebtoken";

export default (req, res, next) =>{
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    console.log(token);

    if (token) {
    try{
        const decoded = jwt.verify(token, "mySecretKeyToken")
        req.userId = decoded._id;
        next();

    } catch(err){
        return res.status(403).json({
            message: 'У вас нет доступа'
        })
    }
    }
    else{
        return res.status(403).json({
            message: 'У вас нет доступа'
        })
    }
}