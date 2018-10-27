/**
 * Created by xavi on 5/16/17.
 */
import {Component} from "@angular/core";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {LoginObject} from "./shared/login-object.model";
import {AuthenticationService} from "./shared/authentication.service";
import {StorageService} from "../core/services/storage.service";
import {Router} from "@angular/router";
import {Session} from "../core/models/session.model";
import { LoginSessionService } from './login.sessionService';
import { LoginService} from './login.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})

export class LoginComponent {
  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public error: {code: number, message: string} = null;

  constructor(private formBuilder: FormBuilder,
           //   private authenticationService: AuthenticationService,
           //   private storageService: StorageService,
              private router: Router,
              private loginSessionService:LoginSessionService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  public submitLogin(): void {
    this.submitted = true;
    this.error = null;
    if(this.loginForm.valid){
    this.loginService.login({
			nombreUsuario : this.loginForm.get('username').value,
			contrasenia :this.loginForm.get('password').value
		}).subscribe(
      response =>{
        console.log("response:",response)
        this.loginSessionService.setToken(this.loginForm.get('username').value)
        this.router.navigate([this.loginSessionService.redirectUrl]);      
      }
    )
    // this.loginSessionService.setToken(this.loginForm.get('username').value)
    // this.router.navigate([this.loginSessionService.redirectUrl]);
     // this.authenticationService.login(new LoginObject(this.loginForm.value)).subscribe(
      //  data => this.correctLogin(data),
      //  error => this.error = JSON.parse(error._body)
      //)
    }
  }

  //private correctLogin(data: Session){
  //  this.storageService.setCurrentSession(data);
  //  this.router.navigate(['/home']);
 // }
}
