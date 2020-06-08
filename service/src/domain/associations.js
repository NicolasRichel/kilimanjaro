const { Label } = require('./labels/label.model');
const { Operation } = require('./operations/operation.model');

module.exports = () => {
  Label.belongsToMany(Operation, { through: 'OperationLabels' });
  Operation.belongsToMany(Label, { through: 'OperationLabels', as: 'labels' });
};
