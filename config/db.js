
const mongoose = require('mongoose');
require('dotenv').config(); // Only necessary for local development with a .env file

const uri = process.env.MONGODB_URI; // Fetch the MongoDB URI from environment variables

if (!uri) {
    console.error("MongoDB connection string is not defined. Please set MONGODB_URI environment variable.");
    process.exit(1); // Terminate the process if the URI is not defined
}

mongoose.connect(uri, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
});

