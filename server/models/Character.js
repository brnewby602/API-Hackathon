var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Flesh out our Character schema and register the model with Mongoose
/*
{
    "name": "Petyr Baelish",
    "nickname": "Littlefinger",
    "house": "Baelish",
    "imageUrl": "http://i.lv3.hbo.com/assets/images/series/game-of-thrones/character/s5/petyr-baelish-512x512.jpg"
  }
*/

var characterSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  nickname: String,
  house: String,
  imageUrl: String
});

var Character = mongoose.model('Character', characterSchema) ;

module.exports = Character;
