const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subscribedToChannel: {
        type: String,
        required: true
    },
    // Setting in types of data
    // If no date is present, then use the present date 
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model("Subscriber", subscriberSchema)