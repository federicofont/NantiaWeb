import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';

@Component ({
	selector: 'formUsuarioAdd',
	templateUrl: '../views/usuario-add.html',
	providers: [UsuarioService],
	styles: [`
		.ng-invalid.ng-touched:not(form){
		border:1px solid red;
		}`]
})

export class UsuarioAddComponent{
	public titulo: string;
	
	usuario:Usuario = {
		id: null,
		usuario : null,
		nombre : null,
		apellido :null,
		rol :null,
		contrasenia :null
	}

	nuevo:boolean=false;
	id:number;

	constructor(private _usuarioService: UsuarioService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute){
		
		this.titulo = 'Nuevo usuarios';

		this._activatedRoute.params
			.subscribe( parametros=>{
			console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}
	 

	ngOnInit(){
		console.log('usuario-add.component.ts cargado');
	}

	guardar(usuarioAdd:NgForm){
		console.log(this.id);
		if (this.id==null) {
			// Add user
		
			//Creo el usuario desde el formulario
			this.usuario=usuarioAdd.value;
			console.log("Usuario:",this.usuario);
		
			this._usuarioService.addUsuario(this.usuario)
				.subscribe(response => {
				console.log("response:",response);
 					if(response.status==200){
 						this._router.navigate(['/home']);
 					}else{
 						console.log(response);
					}
 				},
 				error => {
 					console.log(<any>error);
 				})
 		}else{
 			// Update user
			
			//Actualizo el usuario desde el formulario
			this.usuario=usuarioAdd.value;
			this.usuario.id=this.id;
			console.log("Usuario:",this.usuario);
		
			this._usuarioService.updateUsuario(this.usuario)
				.subscribe(response => {
				console.log("response:",response);
 					if(response.status==200){
 						this._router.navigate(['/home']);
 					}else{
 						console.log(response);
					}
 				},
 				error => {
 					console.log(<any>error);
 				})
 		}

	}
}