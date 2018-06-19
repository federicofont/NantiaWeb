import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { LoginService } from './login.service';
import { Login} from './login.model';
import { Usuario } from '../usuarios/usuario.model';

@Component ({
	selector: 'form-login',
	templateUrl: './login.html',
	providers: [LoginService],
	styles: [`
		.ng-invalid.ng-touched:not(form){
		border:1px solid red;
		}`]
})

export class LoginComponent{
	public titulo: string;

	loginUsuario:Login = {
			nombreUsuario : null,
			contrasenia :null
		}
	usuarioConectado:Usuario;

	constructor(private _loginService: LoginService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute){

	}
	 

	ngOnInit(){
		console.log('login.component.ts cargado');
	}

	validar(loginUser:NgForm){
		// Login user
		
			//Tomo usuario y Pass desde el formulario
			this.loginUsuario=loginUser.value;
		
			this._loginService.login(this.loginUsuario)
				.subscribe(result => {
 					if(result.status == 200){
 						this._router.navigate(['/home']);
 					}else{
 						//401 Unauthorized
 						console.log("Login Status:",result.status);
 						this._router.navigate(['/login_error']);
					}
 				},
 				error => {
 					console.log(<any>error);
 					console.log("Login Status:",error.status);
 					this._router.navigate(['/login_error']);
 				})
	}
}