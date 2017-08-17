import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-character-browser',
  templateUrl: './character-browser.component.html',
  styleUrls: ['./character-browser.component.css']
})

export class CharacterBrowserComponent implements OnInit {

  constructor(private http: Http) { }

  offenseCharacters = [];
  defenseCharacters = [];
  tankCharacters = [];
  supportCharacters = [];

  ngOnInit() {
  	this.getCharacters();

  }

  getCharacters(){
  	this.http.get('http://localhost:3000/characters').subscribe(response => {
  		var processedResponse = response.json();
  		for(var i = 0; i < processedResponse.length; i++) {
  			if(processedResponse[i].role === 'Offense'){
  				this.offenseCharacters.push(processedResponse[i])
  			} else if (processedResponse[i].role === 'Defense') {
  				this.defenseCharacters.push(processedResponse[i])
  			} else if (processedResponse[i].role === 'Tank') {
  				this.tankCharacters.push(processedResponse[i])
  			} else if (processedResponse[i].role === 'Support') {
  				this.supportCharacters.push(processedResponse[i])
  			}
  		}
  	})
  }

}
