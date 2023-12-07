// Import Mongoose for MongoDB connectivity
const mongoose = require('mongoose');

// Define a Mongoose schema for the 'users' collection
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Create a Mongoose model named 'User' based on the 'userSchema'
const user= mongoose.model('User',userSchema);

// Export the 'User' model to make it available for use in other files
module.exports = user;