/**
 * ******************************
 * * Kilimanjaro Server Starter *
 * ******************************
 */

// Initialize Components
const database = require('./components/database');
database.init(); // async
const controller = require('./components/controller');
controller.init();
const server = require('./components/server');
server.init();

// Start server
server.start();
