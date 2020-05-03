// Server Component
// ----------------

const controller = require('./controller');
const cors = require('cors');
const express = require('express');

class Server {

  server = null;

  constructor() {}

  init() {
    console.log('Init : Server component');
    this.server = express();
    this.server.use( cors({ origin: process.env.ALLOWED_ORIGINS }) );
    this.server.use( express.json() );
    this.server.use( '/', controller.router );
    this.server.use((error, req, res, next) => {
      console.error( error.stack );
      res.status(500).json({ error: error.message });
    });
  }

  start() {
    const port = process.env.SERVER_PORT;
    this.server.listen(
      port, () => console.log(`Server started and listening on port: ${port}`)
    );
  }

}

module.exports = new Server();
