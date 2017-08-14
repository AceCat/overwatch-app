var mongoose = require('mongoose');

var AbilitySchema = new mongoose.Schema({
  name: String,
  image: String,
  abilityStats: {
    damage: Number,
    disruption: Number,
    mobility: Number,
    protection: Number,
    sustain: Number,
    healing: Number
  },
  description: String,
  character: [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}]
});


var abilityModel = mongoose.model('Ability', AbilitySchema);

module.exports = abilityModel;