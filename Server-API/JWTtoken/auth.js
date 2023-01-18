const       jwt = require("jsonwebtoken");
const       fs = require('fs');
const       path = require('path');
const auth  = (req, res, next)=>{
    let key = fs.readFileSync(path.join(__dirname,"../conts.txt"));
    console.log(key.toString());
    try{
        let headerValue = req.headers.authorization;
       if(headerValue){
        let t = headerValue.split(' ')[1];
        let token = jwt.verify(t, key.toString());
        req.username = token.username;
        next();
       }
       else
       {
            res.status(401).json({message: 'Unauthorized User'});
       }
    }
    catch(err)
    {
        res.status(401).json({message: 'Unauthorized user'});
    }
   
}
module.exports = auth;