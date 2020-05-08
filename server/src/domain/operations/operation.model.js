const Sequelize = require('sequelize');

class Operation extends Sequelize.Model {}

module.exports = {
  Operation,
  init(database) {
    Operation.init({
      _id: {
        type: Sequelize.UUIDV4,
        primaryKey: true
      },
      date: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        type: Sequelize.NUMBER,
        allowNull: false
      },
      reference: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {
      sequelize: database,
      modelName: 'Operation'
    });
  }
};
