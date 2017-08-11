import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
  }

}
