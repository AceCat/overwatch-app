import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import Chart from 'chart.js';




@Component({
  selector: 'app-team-analyzer',
  templateUrl: './team-analyzer.component.html',
  styleUrls: ['./team-analyzer.component.css']
})
export class TeamAnalyzerComponent implements OnInit {
	characterCounter = 0;
	selectedCharacter = "";
	errorMessage = "";

	teamChart;
	individualChart;


	colors = [
	"rgba(249,158,26, .5)", "rgba(33,143,254, .5)", "rgba(250,90,73, .5)", "rgba(102,174,52, .5", "rgba(167, 101, 185,.5)"
	]

	characters = [
	{
		name: 'Soldier 76',
	},
	{
		name: 'Reaper'
	},
	{
		name: 'Sombra',
	},
	{
		name: 'Reinhardt'
	},
	{
		name: 'Mercy'
	}
	];

	radarData = {
	    labels: ['Damage', 'Disruption', 'Mobility', 'Protection', 'Healing', 'Sustain'],
	    datasets: [

	    ]
	};

	radarDataAdditive = {
		labels: ['Damage', 'Disruption', 'Mobility', 'Protection', 'Healing', 'Sustain'],
		datasets: [
		]
	};

	currentCharNames = []

  constructor(private http: Http) { 
  }

  ngOnInit() {
  	this.renderTeamRadarChart();
  	this.renderIndividualRadarChart();
  }

	renderTeamRadarChart(){
		var teamRadarChart = $('#teamStats')[0].getContext('2d');

		this.teamChart = new Chart(teamRadarChart, {
		type: 'radar',
		data: this.radarDataAdditive,
		options: {
			scale: {
				ticks: {
					min: -5
				}
		},
        	legend: {
        		position: 'top',
          } 
		}
  	  })
	}

	renderIndividualRadarChart(){
		var individualRadarChart = $('#individualStats')[0].getContext('2d');

		this.individualChart = new Chart(individualRadarChart, {
		type: 'radar',
		data: this.radarData,
		options: {
			scale: {
				ticks: {
					min: -5
				}
		},
        	legend: {
        		position: 'top',
          } 
		}
  	  })
	}
	
	addCharacter(){
		var numChars = $('.charDiv').length

		if (numChars >= 6) {
			this.errorMessage = "You can't have more than six characters on a team"
		} else {
		this.http.get('http://localhost:3000/characters/' + this.selectedCharacter).subscribe(response => {
			var self = this
			var processedResponse = response.json()
			for (let name of this.currentCharNames) {
				if (name === processedResponse.name) {
					self.errorMessage = "This character is already on the team"
					return "end search"
				}
			}
			var newCharacterImage = processedResponse.image
			var iterator = 0;

			function objectValuesToArray(obj) {
  				return Object.keys(obj).map(function (key) { return obj[key]; });
			}

			var newCharacterStats = objectValuesToArray(processedResponse.stats)


			var newCharacter = {
				label: processedResponse.name,
				backgroundColor: this.colors[numChars],
				data: newCharacterStats
			}

			var additiveCharacter = {
				label: processedResponse.name,
				backgroundColor: this.colors[numChars],
				data: []
			}

			//This the array that contains the character objects. Each object has properties like 'label', 
			//'color', and 'data'
			var characters = this.radarDataAdditive.datasets;


			this.createCharacterDiv()
			if (numChars === 0) {
				this.radarData.datasets.push(newCharacter)
				this.radarDataAdditive.datasets.push(newCharacter)
			} else {
				//Adds a character to the individual dataset
				this.radarData.datasets.push(newCharacter)

				for (let data of newCharacter.data) {
					if (characters.length === 0) {
						data = data; 
					} else {
					data = data + characters[characters.length - 1].data[iterator]
				}
					additiveCharacter.data.push(data)
					iterator++;
				}
				iterator = 0;
				this.radarDataAdditive.datasets.push(additiveCharacter)
		}
			this.setCharacterImage(newCharacterImage)
			this.characterCounter++
			this.currentCharNames.push(processedResponse.name);
			this.teamChart.update();
			this.individualChart.update();
			this.selectedCharacter = "";
			this.errorMessage = "";
			console.log(this.currentCharNames)
		})
	}
	}

	createCharacterDiv(){
		var self = this;
		var characterName = this.selectedCharacter;
		var currentCount = this.characterCounter
		console.log("character counter = " + currentCount)
		var newCharacterDiv = $("<div class='col-md-4 charDiv' id=characterId" + this.characterCounter + "><div><h2>" + this.selectedCharacter + "</h2><img id=characterImage" + this.characterCounter + "></div></div>")
		$('.row').append(newCharacterDiv);
		var removeCharacterButton = $('#characterId' + this.characterCounter).append($('<button>Remove</button>'))
		
		function findCharacter(array, attr, value) {
    		for(var i = 0; i < array.length; i += 1) {
        		if(array[i][attr] === value) {
            		return i;
       				}
    			}
    			return -1;
			}

		//This is the click listener that deletes the character div, removes their data from the radarData
		//and updates the charts
		removeCharacterButton.on('click', function(){
			removeCharacterData()
			this.remove()
			self.teamChart.update();
			self.individualChart.update();
		})

		//This finds the characters index by their name. It then removes that index from both arrays, but not
		//before using the array at that index value within the individual array to subtract those values from
		//all characters with a greater index value than the one being removed
		function removeCharacterData(){
			var indexToRemove = self.radarDataAdditive.datasets.findIndex(character => character.label === characterName)
			var removedCharacter = self.radarData.datasets[indexToRemove].data
			var valuesToSubtract = self.radarDataAdditive.datasets
			for (var i = indexToRemove + 1; i < valuesToSubtract.length; i++){
				valuesToSubtract[i].data.forEach(function(item, index, arr){
					arr[index] = item - removedCharacter[index]
			})
		}
			self.currentCharNames.splice(indexToRemove, 1);
			self.radarDataAdditive.datasets.splice(indexToRemove, 1);
			self.radarData.datasets.splice(indexToRemove, 1);

	}

}

	setCharacterImage(imageFile){
		var portraitSpace = $('#characterImage' + this.characterCounter);
		portraitSpace.attr('src', '../../assets/Overwatch_Images/' + imageFile)
	}

}
