/**
 * **********************
 * * Kilimanjaro Server *
 * **********************
 */

// Load environments variables
const config = require('dotenv').config();
if (config.error) {
  console.error('Error loading env variables.');
  console.error(error);
}

// Connect to database
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

// Configure server
const express = require('express');
const server = express();
server.use(express.json());
server.use('/', require('./routes'));

// Start server
const port = process.env.SERVER_PORT;
server.listen(port, () => console.log(`Server Started and listening on port : ${port}`));
