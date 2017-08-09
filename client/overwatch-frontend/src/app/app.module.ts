import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { TeamAnalyzerComponent } from './team-analyzer/team-analyzer.component';
import { CharactersComponent } from './characters/characters.component';

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
    	path: 'characters',
    	component: CharactersComponent
    }
]


@NgModule({
  declarations: [
    AppComponent,
    TeamAnalyzerComponent,
    AboutComponent,
    CharactersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
