var Character = require('../models/Character.js');

// Create our necessary controller methods to perform all needed CRUD actions

exports.createOne = function(req, res) {

  var newCharacter = req.body;

  Character.create(newCharacter, function(err, newCharacter) {

    console.log('IN POST CONTROLLER createOne: ' + newCharacter);
    if(err) {
      return res.json(err);
    }
    res.json(newCharacter);
  })
};

exports.retrieve = function(req, res) {

  Character.find(function(err, allCharacters) {
    if (err) {
      res.json(err);
    }

    res.json(allCharacters);
  });
  

};

exports.retrieveOne = function(req, res) {

  console.log('IM IN retrieveOne:' + req.params.id);
  var query = {_id: req.params.id};

  Character.findOne(query, function(err, matchingCharacter) {
    if (err) {
      res.json(err);
    }
  
    res.json(matchingCharacter);
    
  });
}
