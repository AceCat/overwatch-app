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

	characters = [
	{
		name: 'Soldier 76',
	},
	{
		name: 'Reaper'
	},
	{
		name: 'Sombra',
	}
	];

	radarData = {
	    labels: ['Damage', 'Disruption', 'Mobility', 'Protection', 'Healing', 'Sustain'],
	    datasets: [

	    ]
	};

  constructor(private http: Http) { 
  }

  ngOnInit() {
  	this.renderRadarChart();
  	this.createCharacterDiv();
  }

	renderRadarChart(){
		var teamRadarChart = $('#teamStats')[0].getContext('2d');
		var newChart = new Chart(teamRadarChart, {
		type: 'radar',
		data: this.radarData,
		options: {
        	legend: {
        		position: 'top'
          } 
		}
  	  })
	}


	
	findCharacter(){
		this.http.get('http://localhost:3000/characters/' + this.selectedCharacter).subscribe(response => {
			var processedResponse = response.json()
			var newCharacterImage = processedResponse.image
			console.log(processedResponse)

			function objectValuesToArray(obj) {
  				return Object.keys(obj).map(function (key) { return obj[key]; });
			}

			var newCharacterStats = objectValuesToArray(processedResponse.stats)

			var newCharacter = {
				label: processedResponse.name,
				backgroundColor: "rgba(249,158,26, .5)",
				data: newCharacterStats
			}

			this.characterCounter++
			this.radarData.datasets.push(newCharacter)
			this.renderRadarChart()
			this.setCharacterImage(newCharacterImage)
			this.selectedCharacter = "";
		})
	}

	createCharacterDiv(){
		var newCharacterDiv = $("<div class='col-md-4'><div><img id=characterImage" + this.characterCounter + "/></div></div>")
		$('body').append(newCharacterDiv);
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
