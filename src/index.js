// Import required modules
const mongoose = require('./db/mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('./models/user');

// Create an Express application
const app = express();

app.use(express.json());

app.post('/register',async(req,res) =>{
    try{
        const {username,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new userModel({username, password:hashedPassword});
        await newUser.save();
        res.status(201).json({
            msg:'User registered successfully',
            data: newUser
        });
    }catch(err){
        res.status(401).json({
            msg: err.toString(),
            data: null
        });
    }
});

app.post('/login',async(req,res) => {
    try{
        const {username,password} = req.body;
        const user = await userModel.findOne({username});
        if(!user){
            return res.status(401).json({
                msg: "User not found",
                data: null,
              });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(401).json({
                msg: "Invalid password",
                data: null,
              });
        }
        const token = jwt.sign({ userId: user._id }, 'secret-key');
        res.status(200).json({
            msg:"OK",
            data:{token},
          })
    }catch(err){
        res.status(401).json({
            msg: err.toString(),
            data: null
        });
    }
});
app.listen(3000,(req,res) =>{
    console.log("app is running in port 3000");
})
