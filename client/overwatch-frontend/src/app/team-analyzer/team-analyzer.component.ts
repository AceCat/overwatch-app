import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';





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


	colors = ["rgba(249,158,26, .5)", "rgba(33,143,254, .5)", "rgba(250,90,73, .5)", "rgba(102,174,52, .5", "rgba(167, 101, 185,.5)"]

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
	}];

	radarData = {
	    labels: ['Damage', 'Disruption', 'Mobility', 'Protection', 'Healing', 'Sustain'],
	    datasets: []
	};

	radarDataAdditive = {
		labels: ['Damage', 'Disruption', 'Mobility', 'Protection', 'Healing', 'Sustain'],
		datasets: []
	};

	currentCharNames = []

  constructor(private http: Http) { 
  }

  ngOnInit() {
  	this.renderTeamRadarChart();
  	this.renderIndividualRadarChart();
  }

  	//This renders the radar chart that uses the radarDataAdditive set
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

	//This renders the radar chart that uses the radarData set
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
		//Counts the number of character divs on the page
		var numChars = $('.charDiv').length

		//If there are six character divs the error message changes and the function stops
		if (numChars >= 6) {
			this.errorMessage = "You can't have more than six characters on a team"
		} else {
		this.http.get('http://localhost:3000/characters/' + this.selectedCharacter).subscribe(response => {
			var self = this
			var processedResponse = response.json()

			//Ends function if new character name is already in currentCharNames array
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
			var additiveCharData = this.radarDataAdditive.datasets;


			this.createCharacterDiv(this.colors[numChars])
			if (numChars === 0) {
				this.radarData.datasets.push(newCharacter)
				additiveCharData.push(newCharacter)
			} else {
				//Adds a character to the individual dataset
				this.radarData.datasets.push(newCharacter)

				//Takes the new dataset and adds it to the previous high dataset for additve stats
				for (let stat of newCharacter.data) {
					if (additiveCharData.length === 0) {
						stat = stat; 
					} else {
					stat = stat + additiveCharData[additiveCharData.length - 1].data[iterator]
				}
					additiveCharacter.data.push(stat)
					iterator++;
				}
				iterator = 0;
				this.radarDataAdditive.datasets.push(additiveCharacter)
		}
			this.setCharacterImage(newCharacterImage)
			this.setCharacterStats(newCharacter.data)
			this.characterCounter++
			this.currentCharNames.push(processedResponse.name);
			this.teamChart.update();
			this.individualChart.update();
			this.selectedCharacter = "";
			this.errorMessage = "";
		})
	}
	}

	createCharacterDiv(divColor){
		var self = this;
		var characterName = this.selectedCharacter;
		var currentCount = this.characterCounter
		var newCharacterDiv = $("<div class='col-md-4 charDiv animated slideInRight' id=characterId" + this.characterCounter + "><div class='titleHolder'><h2><a routerLink='/characters/" + this.selectedCharacter + "'>" + this.selectedCharacter + "</h2></a><img id=characterImage" + this.characterCounter + "><ul class='statsList' id=characterStats" + this.characterCounter + "><h3>Stats</h3></ul></div>")
		$('.row').append(newCharacterDiv);
		var characterDiv = $('#characterId' + this.characterCounter)
		characterDiv.append('<span id="removalId' + this.characterCounter + '"class="glyphicon glyphicon-remove"></span>')
		characterDiv.append('<a routerLink="/characters">Details</a>')
		var removeCharacterButton = $('#removalId' + this.characterCounter)

		//Trying to set background color equal to the value of the color key

		// var boxColor = {'background-color': divColor}
		// $('#characterId' + this.characterCounter).attr('ngstyle', boxColor);
		
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
			$(this).attr('class', 'slideOutLeft')
			characterDiv.remove()
			removeCharacterData()
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

	setCharacterStats(stats){
		var newCharacter = $('#characterStats' + this.characterCounter);
		for (var i = 0; i < stats.length; i++) {
			newCharacter.append('<li>' + this.radarData.labels[i] + ": " + stats[i] + "</li>")
		}	
	}

}
