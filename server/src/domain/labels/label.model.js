const Sequelize = require('sequelize');

class Label extends Sequelize.Model {}

module.exports = {
  Label,
  init(database) {
    Label.init({
      _id: {
        type: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING,
        defaultValue: '#CCC'
      },
      textColor: {
        type: Sequelize.STRING,
        defaultValue: '#000'
      }
    }, {
      sequelize: database,
      modelName: 'Label'
    });
  }
};
