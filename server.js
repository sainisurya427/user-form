 // server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http'); // Add this to create an HTTP server
const socketIo = require('socket.io'); // Import Socket.io
 const mongoose = require('./config/db');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

const app = express();
 
const port = process.env.PORT || 3000;

// Create an HTTP server and bind Socket.io to it
const server = http.createServer(app);
const io = socketIo(server); // Initialize Socket.io with the HTTP server

// Enable CORS for development purposes
 app.use(cors({
    origin:`https://user-form-o682.onrender.com/`,
    methods : [`GET`,`POST`]
}));

// Body parser middleware
app.use(bodyParser.json());

// Serve static files (like index.html)
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/user', userRoutes);

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


// Array to store live users
let liveUsers = [];

// Handle Socket.io connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for a user joining the room
    socket.on('joinRoom', (user) => {
        // Add user to the live users array
        liveUsers.push({ socketId: socket.id, email: user.email, name: user.name });

        // Emit the updated live users list to all connected clients
        io.emit('updateUsers', liveUsers);
    });

    // Handle user disconnecting
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        
        // Remove the disconnected user from the live users array
        liveUsers = liveUsers.filter(user => user.socketId !== socket.id);

        // Emit the updated live users list to all connected clients
        io.emit('updateUsers', liveUsers);
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
