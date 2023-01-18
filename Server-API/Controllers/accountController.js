const   express     = require('express'),
        accountRouter  = express.Router(),
        jwt         = require("jsonwebtoken"),
        repository        = require('../Repository/userrepository');
        const fs = require('fs');
        const       path = require('path');


accountRouter.get("/name/exists/:name", async (request, response)=>{
    let username = request.params.name;
    let found=await repository.userNameExists(username);
    return response.status(200).json(found);
});
accountRouter.get("/email/exists/:email", async (request, response)=>{
    let email = request.params.email;
    let found=await repository.emailExists(email);
    return response.status(200).json(found);
});
accountRouter.post('/signup', async(request, response)=>{
    let {username,fullname, gender, dateofbirth, address, mobilenumber,email,pasword}=request.body;
    let result = await repository.Create({username,fullname, gender, dateofbirth, address, mobilenumber,email,pasword});
    if(result)
    response.status(201).json(result.username+ ' created');
    else
    response.status(500).json('Fail to SignUp');
});
accountRouter.post('/login', async(req, res)=>{
    let key = fs.readFileSync(path.join(__dirname,"../conts.txt"));
    console.log(key.toString());
    let {username, pasword}=req.body;
    let userFound = await repository.userNameExists(username);
    if(!userFound) return res.status(404).json({message: 'User not found'});
    let verified = await repository.checkuser(username, pasword);
    if(!verified) return res.status(400).json({message: 'Username or password invalid'});
    let token = jwt.sign({username:username},  key.toString(), {expiresIn:'600s'});
    res.status(200).json({username:username, token:token});

});
module.exports = accountRouter;