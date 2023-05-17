const { Router } = require("express");
const AppRouter = new Router();
const { getProfile,
    registerUser,
    signInUser,
    updateEntries
} = require("./controllers/UserController.js");
const { handleClarifaiCall } = require("./controllers/ApiController.js");

//Routes 

//Get user profile
AppRouter.get("/profile/:id", getProfile);

// Signin an existing user
AppRouter.post("/signin", signInUser);

//Register a new user
AppRouter.post("/register", registerUser)

//Send an image to clarifai API
AppRouter.post("/image", handleClarifaiCall)
//Update entry count
AppRouter.put("/image", updateEntries)

module.exports = AppRouter;

