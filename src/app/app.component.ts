import { Component } from '@angular/core';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Nantia Web';
  public header_color:string

  //lat: number =  -34.4493549;
  //lng: number = -56.4004827;
  //zoom:number = 14;
  
  constructor(){
  	this.header_color=GLOBAL.header_color;
  }

}
