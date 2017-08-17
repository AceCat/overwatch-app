import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { TeamAnalyzerComponent } from './team-analyzer/team-analyzer.component';
import { CharactersComponent } from './characters/characters.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CharacterBrowserComponent } from './character-browser/character-browser.component';

const routes: Routes = [
	{
    	path: 'team-analyzer',
    	component: TeamAnalyzerComponent
    },
    {
    	path: 'about',
    	component: AboutComponent
    },
    {
    	path: 'characters-browser',
    	component: CharacterBrowserComponent
    },
    {
    	path: 'characters/:name',
    	component: CharactersComponent
    }
]


@NgModule({
  declarations: [
    AppComponent,
    TeamAnalyzerComponent,
    AboutComponent,
    CharactersComponent,
    CharacterBrowserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
