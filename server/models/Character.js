var mongoose = require('mongoose');

var CharacterSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String,
  health: Number,
  stats: {
    damage: Number,
    disruption: Number,
    mobility: Number,
    protection: Number,
    sustain: Number,
    healing: Number
  },
  description: String,
  quotes: Array,
  portrait: String,
  Moves: [{type: mongoose.Schema.Types.ObjectId, ref: 'Moves'}]
});


var characterModel = mongoose.model('Character', CharacterSchema);

module.exports = characterModel;