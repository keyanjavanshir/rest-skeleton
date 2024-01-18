// Accesssing local .env file
require('dotenv').config();

// Set up server and database
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;


// Connecting to database asynchronously
async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to Database");
    } catch (error) {
        console.error(error);
    }
}

// Connect to database
connect();

// Set up server to accept JSON
// Allows us to use any middleware that we want
app.use(express.json());


// Set up routes
// We want to use the /subscribers path every time we query subscribers
// Our URL will look like localhost:3000/subscribers
// Anything that has this URL or anything after it etc. localhost:3000/subscribers/example
// Will go into the subscribersRoute middleware @/routes/subscribers
const subscribersRoute = require("./routes/subscribers");
app.use("/subscribers", subscribersRoute);


// Start server
app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`);
});