import { Component } from "@angular/core";
import { GLOBAL } from '../services/global';
import { StorageService } from "../core/services/storage.service";
import { User } from "../core/models/user.model";
//import {AuthenticationService} from "../login/shared/authentication.service";
import { LoginSessionService } from "../login/login.sessionService"

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginSessionService]
})

export class HomeComponent {
  public user: User;

  constructor(
    private storageService: StorageService,
    private _loginSessionService: LoginSessionService
    //  private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.user = this.storageService.getCurrentUser();
  }

  public logout(): void {
    console.log("entre al logout");
    this._loginSessionService.removeToken();
    // this.authenticationService.logout().subscribe(
    //     response => {if(response) {this.storageService.logout();}}
    // );
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