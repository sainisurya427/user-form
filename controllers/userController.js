// controllers/userController.js
const User = require('../models/User');

exports.saveUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();

                // Emit the 'userRegistered' event via socket.io
        const io = req.app.get('socketio');
        io.emit('userRegistered', {
            email: savedUser.email,
            name: `${savedUser.firstName} ${savedUser.lastName}`,
            socketId: req.headers['socket-id']  // Optionally pass socket ID if needed
        });

        
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
