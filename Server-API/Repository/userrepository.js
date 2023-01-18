const express = require('express'),
    Pool =require('pg-pool'),
    bcrypt = require('bcrypt');
    const pool= new Pool({
        user: 'postgres',
        host: 'localhost',
        database:'SecurityDb',
        password:'hasanali',
        port: 5432
    });
    const Create= async (user)=>{
        let hash =await bcrypt.hash(user.pasword, 10);
        let admin = await pool.connect();
        let r= null;
        try
        {
            var x = await admin.query('INSERT INTO users (username,fullname, gender, dateofbirth, address, mobilenumber,email,pasword) VALUES ($1, $2, $3,$4,$5,$6,$7,$8) RETURNING *',
            [user.username, user.fullname,user.gender, user.dateofbirth,user.address, user.mobilenumber, user.email,  hash]);
            r= x.rows[0];
        }
        catch (err)
        {
            
            console.error(err.message, err.stack);
            
        }
        finally{
            admin.release();
        }  
        return r;
    
    }
    const checkuser = async (username, pasword)=>{
        let admin = await pool.connect();
        let isVerified = false;
        try
        {
            var x = await admin.query('SELECT username, pasword FROM users WHERE LOWER(username)=LOWER($1)', [username]);
            if(x.rows.length> 0)
            {
                console.log(pasword);
                console.log(x.rows[0].pasword);
                  let match= await bcrypt.compare(pasword, x.rows[0].pasword);
                  console.log(match);
                  if(match){
                    isVerified=true;
                  }
                  else{
                    isVerified=false;
                  }
            }
            else{
                isVerified=false
            }
           
        }
        catch (err)
        {
            
            console.error(err.message, err.stack);
            isVerified=false;
            
        }
        finally{
            admin.release();
        }  
        
        return isVerified;
    }
    const userNameExists = async (username)=>{
        let admin = await pool.connect();
        let search = false;
        try
        {
            var x = await admin.query('SELECT 1 FROM users WHERE LOWER(username)=LOWER($1)', [username]);
            console.log(x.rows.length)
            if(x.rows.length> 0)
            search= true;
           
           
        }
        catch (err)
        {
            
            console.error(err.message, err.stack);
            
        }
        finally{
            admin.release();
        }  
        
        return search;
    }
    const emailExists = async (email)=>{
        let admin = await pool.connect();
        let search = false;
        try
        {
            var x = await admin.query('SELECT 1 FROM users WHERE LOWER(email)=LOWER($1)', [email]);
            console.log(x.rows.length)
            if(x.rows.length> 0)
            search= true;
           
           
        }
        catch (err)
        {
            
            console.error(err.message, err.stack);
            
        }
        finally{
            admin.release();
        }  
        
        return search;
    }
    
    module.exports = {Create,checkuser, userNameExists, emailExists}