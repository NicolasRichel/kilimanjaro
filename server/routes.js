const router = require('express').Router();

// Label routes
const labelController = require('./controllers/label.controller');
router.get('/labels', ...labelController.getAllLabels);
router.get('/label/:id', ...labelController.getLabel);
router.post('/label/create', ...labelController.createLabel);
router.patch('/label/update/:id', ...labelController.updateLabel);
router.delete('/label/delete/:id', ...labelController.deleteLabel);
router.delete('/label/purge', ...labelController.deleteAllLabels);

// Operation routes
const operationController = require('./controllers/operation.controller');
router.get('/operations', ...operationController.getAllOperations);
router.get('/operation/:id', ...operationController.getOperation);
router.post('/operation/create', ...operationController.createOperation);
router.patch('/operation/update/:id', ...operationController.updateOperation);
router.delete('/operation/delete/:id', ...operationController.deleteOperation);
router.delete('/operation/purge', ...operationController.deleteAllOperations);


module.exports = router;
