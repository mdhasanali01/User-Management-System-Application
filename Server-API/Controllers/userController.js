const express = require('express'),
    Pool =require('pg-pool'),
    bcrypt = require('bcrypt'),
    userRouter = express.Router();
    auth = require('../JWTtoken/auth');
const pool= new Pool({
    user: 'postgres',
    host: 'localhost',
    database:'SecurityDb',
    password:'hasanali',
    port: 5432
});
userRouter.get("/user", auth, async (request, response)=>{
    let admin = await pool.connect();
    try
    {
        var results = await admin.query('SELECT * FROM users');
        response.status(200).json(results.rows)
    }
    catch (c)
    {
        res.status(500).json("Server error");
        console.error(c.message, c.stack);
    }
    finally{
        admin.release();
    }  
});
userRouter.get("/user/:id",auth, async (request, response)=>{
    let id= request.params.id;
    let admin = await pool.connect();
    try
    {
        var results = await admin.query('SELECT userid, fullname,dateofbirth, email, mobilenumber,address FROM users WHERE userid=$1', [id]);
        console.log(results.rows[0])
        response.status(200).json(results.rows[0])
    }
    catch (c)
    {
        res.status(500).json("Server error");
        console.error(c.message, c.stack);
    }
    finally{
        admin.release();
    }  
});
userRouter.post("/user",auth, async (request, response)=>{
    let {username, fullname, gender, dateofbirth, address, mobilenumber,email,pasword}=request.body;
    let hash =await bcrypt.hash(pasword, 10);
    let admin = await pool.connect();
    try
    {
        var results = await admin.query('INSERT INTO users (username,fullname, gender, dateofbirth, address, mobilenumber,email,pasword) VALUES ($1, $2, $3,$4,$5,$6,$7,$8) RETURNING *',[username, fullname, gender, dateofbirth, address, mobilenumber,email, hash]);
        response.status(201).json(results.rows[0]);
    }
    catch (c)
    {
        res.status(500).json("Server error");
        console.error(c.message, c.stack);
    }
    finally{
        admin.release();
    }  
});
userRouter.put("/user/:id",auth,async (request, res)=>{
    let id = request.params.id
    let {username, password, fullname, dateofbirth, address, mobilenumber,email}=request.body;
    
    let admin = await pool.connect();
    try
    {
        var results = await admin.query('UPDATE users SET fullname=$1, dateofbirth=$2, address=$3, mobilenumber=$4, email=$5 WHERE userid=$6 RETURNING *',[fullname, dateofbirth, address, mobilenumber,email, id]);
        res.status(202).json('Update');
    }
    catch (c)
    {
        res.status(500).json("Server error");
        console.error(c.message, c.stack);
    }
    finally{
        admin.release();
    }  
});

userRouter.get("/user/name/:name",auth, async (req, res)=>{
    let name= req.params.name;
    let admin = await pool.connect();
    try
    {
        var x = await admin.query('SELECT userid, username,fullname,gender,dateofbirth,address,mobilenumber, email,  picture FROM users WHERE LOWER(username)=LOWER($1)', [name]);
        console.log(x.rows[0])
        res.status(200).json(x.rows[0])
    }
    catch (err)
    {
        res.status(500).json("Server error");
        console.error(err.message, err.stack);
    }
    finally{
        admin.release();
    }  
});
module.exports = userRouter;