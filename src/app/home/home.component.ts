import {Component} from "@angular/core";
import { GLOBAL } from '../services/global';
import {StorageService} from "../core/services/storage.service";
import {User} from "../core/models/user.model";
import {AuthenticationService} from "../login/shared/authentication.service";
@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['./app.component.css']
})

export class HomeComponent {
  public user: User;

  constructor(
    private storageService: StorageService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.user = this.storageService.getCurrentUser();
  }

  public logout(): void{
    this.authenticationService.logout().subscribe(
        response => {if(response) {this.storageService.logout();}}
    );
  }

}

/*@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Nantia Web';
//  public header_color:string

  constructor(){
//    this.header_color=GLOBAL.header_color;
  }

    ngOnInit(){
    //console.log('login.component.ts cargado');
    console.log(GLOBAL.login);
  }

}
*/