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

	teamChart;
	individualChart;


	colors = [
	"rgba(249,158,26, .5)", "rgba(33,143,254, .5)"
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
		this.http.get('http://localhost:3000/characters/' + this.selectedCharacter).subscribe(response => {
			var self = this
			var processedResponse = response.json()
			var newCharacterImage = processedResponse.image
			console.log(processedResponse)
			var iterator = 0;

			function objectValuesToArray(obj) {
  				return Object.keys(obj).map(function (key) { return obj[key]; });
			}

			var newCharacterStats = objectValuesToArray(processedResponse.stats)


			var newCharacter = {
				label: processedResponse.name,
				backgroundColor: this.colors[this.characterCounter],
				data: newCharacterStats
			}

			var additiveCharacter = {
				label: processedResponse.name,
				backgroundColor: this.colors[this.characterCounter],
				data: []
			}


			this.createCharacterDiv()
			if (this.characterCounter === 0) {
				this.radarData.datasets.push(newCharacter)
				this.radarDataAdditive.datasets.push(newCharacter)
			} else {
				this.radarData.datasets.push(newCharacter)
				for (let data of newCharacter.data) {
					data = data + this.radarDataAdditive.datasets[this.characterCounter-1].data[iterator]
					console.log(data)
					additiveCharacter.data.push(data)
					iterator++;
				}
				iterator = 0;
				this.radarDataAdditive.datasets.push(additiveCharacter)
		}
			this.setCharacterImage(newCharacterImage)
			this.characterCounter++
			this.teamChart.update();
			this.individualChart.update();
			this.selectedCharacter = "";
		})
	}

	createCharacterDiv(){
		var self = this;
		var characterName = this.selectedCharacter;
		var currentCount = this.characterCounter
		console.log("character counter = " + currentCount)
		var newCharacterDiv = $("<div class='col-md-4' id=characterDiv" + this.characterCounter + "><div><h2>" + this.selectedCharacter + "</h2><img id=characterImage" + this.characterCounter + "></div></div>")
		$('.row').append(newCharacterDiv);
		var removeCharacterButton = $('#characterDiv' + this.characterCounter).append($('<button>Remove</button>'))
		
		function findCharacter(array, attr, value) {
    		for(var i = 0; i < array.length; i += 1) {
        		if(array[i][attr] === value) {
            		return i;
       				}
    			}
    			return -1;
			}

		removeCharacterButton.on('click', function(){
			removeCharacterData()
			this.remove()
			self.characterCounter--
			self.teamChart.update();
		})

		function removeCharacterData(){
			var indexToRemove = self.radarDataAdditive.datasets.findIndex(character => character.label === characterName)

			var removedCharacter = self.radarDataAdditive.datasets[indexToRemove].data
			var valuesToSubtract = self.radarDataAdditive.datasets
			for (var i = currentCount + 1; i < valuesToSubtract.length; i++){
				valuesToSubtract[i].data.forEach(function(item, index, arr){
					arr[index] = item - removedCharacter[index]
			})
		}
			self.radarDataAdditive.datasets.splice(indexToRemove, 1);

	}

}

	setCharacterImage(imageFile){
		var portraitSpace = $('#characterImage' + this.characterCounter);
		portraitSpace.attr('src', '../../assets/Overwatch_Images/' + imageFile)
	}

}
