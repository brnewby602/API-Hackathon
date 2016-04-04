var characterRouter = require('express').Router();
var characterController = require('../controllers/characterController.js');

// Declare routes for our resource endpoints and specify what controller method we're going to use for each

characterRouter.route('/').get(characterController.retrieve);

characterRouter.route('/:id').get(characterController.retrieveOne);

characterRouter.route('/').post(characterController.createOne);

module.exports = characterRouter;
