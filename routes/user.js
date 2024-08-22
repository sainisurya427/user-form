 const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Assuming you have a User model
const userController = require('../controllers/userController');
const io = require('../server').io; // Import the socket.io instance

// Save user data
// router.post('/save', async (req, res) => {
//     try {
//         const newUser = new User(req.body);
//         await newUser.save();
//       // Notify socket.io to join the user to the room
//         io.emit('userSaved', savedUser);
//         res.status(201).json({ message: 'User saved successfully!' });
//     } catch (err) {
//         res.status(400).json({ message: 'Error saving user: ' + err.message });
//     }
// });

// // Load user data
// router.get('/load', async (req, res) => {
//     try {
//         const users = await User.find(); // Retrieve all users from the database
//         res.status(200).json(users);     // Send the users data as a JSON response
//     } catch (err) {
//         res.status(500).json({ message: 'Error loading users: ' + err.message });
//     }
// });

router.post("/save", userController.saveUser);

router.get("/load",userController.getAllUsers );

module.exports = router;
