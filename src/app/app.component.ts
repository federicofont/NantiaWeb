import { Component } from '@angular/core';
import { GLOBAL } from './services/global';
import {AuthenticationService} from "./login/shared/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AuthenticationService ]
})
export class AppComponent {
  public title = 'Nantia Web';
//  public header_color:string

  constructor(){
//  	this.header_color=GLOBAL.header_color;
  }

  	ngOnInit(){
		//console.log('login.component.ts cargado');
		console.log(GLOBAL.login);
	}
}
