const SECRET_KEY = 'ani#74fauji@98$[-&-]z_';
const jwt = require('jsonwebtoken');
const fetchUser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
      return   res.status(401).send({error:'Access Denied'});
    }
    try {
    const data = jwt.verify(token , SECRET_KEY );
    req.user = data.user;
    next();
    } catch (error) {
        res.send('Error during verification');
    }
}

module.exports = fetchUser;