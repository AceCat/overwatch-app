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
  	this.renderRadarChart();
  }

	renderRadarChart(){
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


	
	findCharacter(){
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

			console.log(newCharacterStats)

			var additiveCharacterStats = []


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
				console.log('firing')
				this.radarData.datasets.push(newCharacter)
				for (let data of newCharacter.data) {
					data = data + this.radarData.datasets[this.characterCounter-1].data[iterator]
					console.log(data)
					additiveCharacter.data.push(data)
					iterator++;
				}
				console.log(this.radarData.datasets)
				console.log(this.radarDataAdditive.datasets)
				iterator = 0;
				this.radarDataAdditive.datasets.push(additiveCharacter)
		}
			this.setCharacterImage(newCharacterImage)
			this.characterCounter++
			this.teamChart.update();
			this.selectedCharacter = "";
		})
	}

	createCharacterDiv(){
		var self = this;
		var currentCount = this.characterCounter
		var newCharacterDiv = $("<div class='col-md-4' id=characterDiv" + this.characterCounter + "><div><h2>" + this.selectedCharacter + "</h2><img id=characterImage" + this.characterCounter + "></div></div>")
		$('.row').append(newCharacterDiv);
		var removeCharacterButton = $('#characterDiv' + this.characterCounter).append($('<button>Remove</button>'))
		removeCharacterButton.on('click', function(){
			this.remove()
			self.radarDataAdditive.datasets.splice(currentCount - 1, 1);
			self.characterCounter--;
			self.teamChart.update();
		})
	}

	setCharacterImage(imageFile){
		var portraitSpace = $('#characterImage' + this.characterCounter);
		portraitSpace.attr('src', '../../assets/Overwatch_Images/' + imageFile)
	}


	// loadCharacter(){
	// 	this.http.get()
	// }



		    //  {
	        //     label: 'Team Totals',
	        //     backgroundColor: "rgba(249,158,26, .5)",
	        //     fillColor: '#f99e1a',
	        //     colours: "[ [204, 0, 0], [230, 230, 0], [0, 153, 51] ]", 
	        //     data: [35, 0, 15, 0, 10, 20]
	        // },
	        // {
	        //     label: 'Soldier 76',
	        //     backgroundColor: "rgba(249,158,26, .5)",
	        //     fillColor: '#f99e1a',
	        //     colours: "[ [204, 0, 0], [230, 230, 0], [0, 153, 51] ]", 
	        //     data: [35, 0, 15, 0, 10, 20]
	        // },
	        // {
	        //     label: 'Road Hog',
	        //     fillColor: '#218ffe',
	        //     data: [20, 10, 0, 0, 0, 40]
	        // }

}
