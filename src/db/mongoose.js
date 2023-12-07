// Create an Express application
const mongoose = require('mongoose');

// Connect to the MongoDB database named 'auth-api'
mongoose.connect('mongodb://localhost:27017/auth-api',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    // If the connection is successful, log a success message
    console.log("connected successfully");
}).catch((err) =>{
    // If an error occurs during connection, log an error message
    console.log("something went wrong:",err);
})