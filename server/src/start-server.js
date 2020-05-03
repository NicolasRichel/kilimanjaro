/**
 * ******************************
 * * Kilimanjaro Server Starter *
 * ******************************
 */

// Load configuration
const config = require('dotenv').config({ path: '.config' });
if (config.error) {
  console.error('Fail to load configuration.');
  console.error(config.error);
}

// Initialize Components
const database = require('./components/database');
database.init(); // async
const controller = require('./components/controller');
controller.init();
const server = require('./components/server');
server.init();

// Start server
server.start();
