var bodyParser = require('body-parser');
var Ability = require('../models/Ability');
var Character = require('../models/Character');
var express = require('express');
var path = require('path');
var router = express.Router();


router.use(bodyParser.json());

router.get('/', function (request, response) {
Ability.find(function(error, abilities) {
      response.send(abilities);
  })
});

router.get('/:id', function(request, response){
	var id = request.params.id;
	Ability.findById(id, function(err, ability){
		response.send(ability);
	})
})

router.post('/', function (request, response) {
	var ability = new Ability ({
		name: request.body.name,
		description: request.body.description,
		image: request.body.image,
		abilityStats: request.body.abilityStats, 
		character: request.body.character
	})
	console.log(request.body.character)
	ability.save();
	var abilityId = ability.id
	var abilityOwner = ability.character
	console.log(abilityOwner);
	Character.findById(abilityOwner, function(err, character){
		console.log(character)
		character.abilities.push(abilityId)
		character.save()
	})
	response.send(ability);
});

router.patch('/:id', function (request, response) {
	let id = request.params.id;
	Ability.findById(id, function(err, ability) {
		ability.name = request.body.name;
		ability.description = request.body.description;
		ability.image = request.body.image;
		ability.abilityStats = request.body.abilityStats
		ability.character = request.body.character
		ability.save();
		response.send(ability)
	})
});

router.delete('/:id', function (request, response) {
	let id = request.params.id;
	Ability.findById(id, function (err, ability) {
		ability.remove()
	})
	response.send('removed ability')
});

module.exports = router;


