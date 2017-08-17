import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

    constructor(private router: Router) {}


  	selectedCharacter = ""

	characterNames = [
	{
		name: 'Ana'
	},
	{
		name: 'Bastion'
	},
	{
		name: 'DVa'
	},
	{
		name: 'Doomfist'
	},
	{
		name: 'Genji'
	},
	{
		name: 'Hanzo'
	},
	{
		name: 'Junkrat'
	},
	{
		name: 'Lucio'
	},
	{
		name: 'McCree'
	},
	{
		name: 'Mei'
	},
	{
		name: 'Mercy'
	},
	{
		name: 'Orisa'
	},
	{
		name: 'Pharah'
	},
	{
		name: 'Reaper'
	},
	{
		name: 'Reinhardt'
	},
	{
		name: 'Roadhog'
	},
	{
		name: 'Soldier 76'
	},
	{
		name: 'Sombra'
	},
	{
		name: 'Symmetra'
	},
	{
		name: 'Torbjorn'
	},
	{
		name: 'Tracer'
	},
	{
		name: 'Widowmaker'
	},
	{
		name: 'Winston'
	},
	{
		name: 'Zarya'
	},
	{
		name: 'Zenyatta'
	}];

	searchCharacter(){
		this.router.navigate(['/characters/' + this.selectedCharacter]);
		this.selectedCharacter = "";
	}
  
}
