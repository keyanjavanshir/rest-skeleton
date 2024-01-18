const express = require('express');
const router = express.Router();

// Access subscriberSchema from models
const Subscriber = require("../models/subscriber");

// Setting up RESTful API for CRUD operations

// Getting all queries
router.get("/", async (req, res) => {
    try {
        // Use await as it is an asynchronous method
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        // Status 500 means that there is an error on server
        // use JSON due to being an JSON API
        res.status(500).res.json({ message: err.message })
    }
    
});




// Getting one query
// Use ID to get specific user id
router.get("/:id", getSubscriber, (req, res) => {
    res.json(res.subscriber)
});




// Create one query with post
// Creating with the general route
router.post("/", async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const newSubscriber = await subscriber.save()
        // Status 201 specifically means, succesfully created an object
        // By default a status code of 200 will be sent, which means everything 
        // was succesful, but when posting always use status code 201
        res.status(201).json(newSubscriber)
    } catch (err) {
        // If the user gives bad data i.e. the Client
        // Then you want to provide a status code 400 instead of 500
        // As the status code 500 represents server erros
        res.status(400).json({ message: err.message })
    }
});




// Update one query
// Use patch instead of put as we will only to update what the user passes us
// i.e. update name, update age etc.
router.patch("/:id", getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }

    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }

    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});




// Delete one query
router.delete("/:id", getSubscriber, async (req, res) => {
    try {
        await res.subscriber.deleteOne()
        res.json({ message: "Deleted subscriber" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}); 



// Middleware
async function getSubscriber(req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.subscriber = subscriber
  next()
}


// Export

module.exports = router;