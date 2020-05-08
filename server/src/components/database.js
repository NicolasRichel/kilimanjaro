// Database Component
// ------------------
const linkModels = require('../domain/associations');
const Sequelize = require('sequelize');
const uuidv4 = require('uuidv4');

const models = [
  require('../domain/labels/label.model'),
  require('../domain/operations/operation.model')
];

class Database {

  // database = null;

  constructor() {}

  async init() {
    console.log('Init : Database component');
    this.database = new Sequelize(
      process.env.DATABASE_URL,
      {
        define: {
          freezeTableName: true,
          timestamps: false,
          hooks: {
            beforeCreate: (instance) => instance._id = uuidv4.uuid()
          }
        }
      }
    );
    try {
      await this.database.authenticate();
      console.log('Connected to database');
      models.forEach( model => model.init(this.database) );
      linkModels();
      console.log('Models are initialized');
      await this.database.sync();
      console.log('Database is synchronized');
    } catch (error) {
      console.error(error);
    };
  }

}

module.exports = new Database();
