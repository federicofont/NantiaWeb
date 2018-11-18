import { Component } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
//import { LoginObject } from "./shared/login-object.model";
//import { AuthenticationService } from "./shared/authentication.service";
//import { StorageService } from "../core/services/storage.service";
import { Router } from "@angular/router";
//import { Session } from "../core/models/session.model";
import { LoginSessionService } from './login.sessionService';
import { LoginService } from './login.service';
import { LoginError, Login } from './login.model';
import { Usuario } from '../usuarios/usuario.model';
import { parse, stringify } from "querystring";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})

export class LoginComponent {
  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public error: LoginError = new LoginError();
  public user:Usuario;

  constructor(private formBuilder: FormBuilder,
    //   private authenticationService: AuthenticationService,
    //   private storageService: StorageService,
    private router: Router,
    private loginSessionService: LoginSessionService,
    private loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      nombreUsuario: ['', Validators.required],
      contrasenia: ['', Validators.required],
    })
  }

  public submitLogin(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loginService.login({
        nombreUsuario: this.loginForm.get('nombreUsuario').value,
        contrasenia: this.loginForm.get('contrasenia').value
      }).subscribe(
        result => {
          /*Controlo si es Administrador o Vendedor*/     
          let usuario = JSON.parse(JSON.stringify(result));
          this.user = <Usuario>usuario;
          //console.log("Rol",this.user.rol.nombreRol);
          console.log("Rol",this.user.rol.nombreRol);
          if(this.user.rol.nombreRol == 'Administrador'){    
            console.log("If");   
            this.loginSessionService.setToken(this.loginForm.get('nombreUsuario').value)
            this.router.navigate([this.loginSessionService.redirectUrl]);
          }else{
            console.log("Else");
            this.error.code = 401;
            this.error.message = "Usuario no permitido";
          }
        },
        error => {
          this.error.code = error.status;
          this.error.message = "Usuario o contraseña incorrecta";
          //console.log(this.error);


        }
      )
      // this.loginSessionService.setToken(this.loginForm.get('username').value)
      // this.router.navigate([this.loginSessionService.redirectUrl]);
      // this.authenticationService.login(new LoginObject(this.loginForm.value)).subscribe(
      //  data => this.correctLogin(data),
      //  error => thi;s.error = JSON.parse(error._body)
      //)
    }
  }

  //private correctLogin(data: Session){
  //  this.storageService.setCurrentSession(data);
  //  this.router.navigate(['/home']);
  // }
}
