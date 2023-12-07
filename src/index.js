// Import required modules
const mongoose = require('./db/mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('./models/user');

// Create an Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Endpoint to handle user registration
app.post('/register',async(req,res) =>{
    try{
        const {username,password} = req.body;

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password,10);

        // Create a new user using the userModel
        const newUser = new userModel({username, password:hashedPassword});

        // Save the new user to the database
        await newUser.save();

        // Respond with a success message and the registered user data
        res.status(201).json({
            msg:'User registered successfully',
            data: newUser
        });
    }catch(err){
        // Handle any errors that occurred during registration
        res.status(401).json({
            msg: err.toString(),
            data: null
        });
    }
});

// Endpoint to handle user login
app.post('/login',async(req,res) => {
    try{
        const {username,password} = req.body;

        // Find the user in the database
        const user = await userModel.findOne({username});

        // If the user does not exist, return an error response
        if(!user){
            return res.status(401).json({
                msg: "User not found",
                data: null,
              });
        }

        // If the user does not exist, return an error response
        const passwordMatch = await bcrypt.compare(password, user.password);

         // If the password is invalid, return an error response
        if(!passwordMatch){
            return res.status(401).json({
                msg: "Invalid password",
                data: null,
              });
        }

        
        // Generate a JWT token for the user
        const token = jwt.sign({ userId: user._id }, 'secret-key');
        res.status(200).json({
            msg:"OK",
            data:{token},
          })
    }catch(err){
        // Handle any errors that occurred during login
        res.status(401).json({
            msg: err.toString(),
            data: null
        });
    }
});

// Start the Express application on port 3000
app.listen(3000,(req,res) =>{
    console.log("app is running in port 3000");
})
