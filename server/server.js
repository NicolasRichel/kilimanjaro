/**
 * **********************
 * * Kilimanjaro Server *
 * **********************
 */

// Load configuration
const configFile = `.config.${process.argv[2]}`;
const config = require('dotenv').config({ path: configFile });
if (config.error) {
  console.error(`Error loading config (file : ${configFile}).`);
  console.error(config.error);
}

// Connect to database
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

// Configure server
const express = require('express');
const server = express();
server.use( require('cors')({ origin: process.env.ALLOWED_ORIGINS }) );
server.use( express.json() );
server.use( '/', require('./router') );
server.use( require('./error-handler') );

// Start server
const port = process.env.SERVER_PORT;
server.listen(port, () => console.log(`Server Started and listening on port : ${port}`));
