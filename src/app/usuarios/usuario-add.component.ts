import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { UsuarioService } from '../usuarios/usuario.service';
import { Usuario } from './usuario.model';

import { RolService } from '../roles/rol.service';
import { Rol } from '../roles/rol.model';

@Component ({
	selector: 'formUsuarioAdd',
	templateUrl: '../usuarios/usuario-add.html',
	providers: [UsuarioService, RolService],
	styles: [`
		.ng-invalid.ng-touched:not(form){
		border:1px solid red;
		}`]
})

export class UsuarioAddComponent{
	public titulo: string;
	
	usuario : Usuario = new Usuario();
	rol : Rol = new Rol();
	roles : Rol []=[];

	nuevo:boolean=false;
	id:number;

	constructor(private _usuarioService: UsuarioService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute,
				private _rolService: RolService
				){
		
		
		if(this.id != null){
			this.titulo = 'Editar Usuario'
		}else{
			this.titulo = 'Nuevo Usuario';	
		} 


		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}
	 

	ngOnInit(){
		//console.log('usuario-add.component.ts cargado');

		if(this.id != null){
			this.getUsuario();
		}

		  
		  this.getRoles();

	}


	getRoles(){
		this._rolService.getRoles().subscribe(
			result =>{
				if(result.status == 200){
					 this.roles = result.json();
					 //console.log(result.json());
				}else{
					console.log("Result Controler",result.status); 
				}
			},
			error =>{
				console.log(<any>error);
			}
		);
	}

	getUsuario(){
	this._usuarioService.getUsuario(this.id).subscribe(
		result =>{
				if(result.status == 200){
					console.log("status:",result.status);
					 this.usuario = result.json();
					 this.rol = this.usuario.rol;						 
					
				}else{
					console.log("ID:",this.id," Result Controler:",result.status);
				}

			},
			error =>{
				console.log(<any>error);
			}
		)
	}

	guardar(usuarioAdd:NgForm){

		this.usuario = usuarioAdd.value;
		//console.log("Rol Seleccionado", usuarioAdd.controls['rolId'].value);
		//Cargo el objeto ROL
		this.setRol(usuarioAdd.controls['rolId'].value);

		this.usuario.rol = this.rol;
		//console.log("Usuario:",this.usuario);
			
		if(this.id != null){

			this.usuario.id=this.id;
			this.updateUsuario();
		
		}else{
		
			this.addUsuario();
 		}

	}

	setRol(id){	
		console.log("Set Rol");
		var ind:number=0;
		var idRol:number = id;
		
		//recupero el objeto ROL del arre de Roles
    	for (var i = this.roles.length - 1; i >= 0; i--) {
			if(this.roles[i].id == idRol)
				ind = i;
			else
				//console.log("i",i);
		}

		this.rol = this.roles[ind];
		//const nuevo_rol = new Rol( 	this.roles[ ind ].id,
		//							this.roles[ ind ].nombreRol, );

	}

	addUsuario(){
		console.log("ADD");
		this._usuarioService.addUsuario(this.usuario)
			.subscribe(result => {
					if(result.status==201){
						this._router.navigate(['/usuarios/'+result.json().id]);
					}else{
						console.log("Result Controler",result.status);
				}
				},
				error => {
					console.log(<any>error);
				})
	}

	updateUsuario(){
		console.log("Update");
		this._usuarioService.editUsuario (this.id, this.usuario)
				.subscribe(result => {
 					if(result.status=200){
 						console.log("Result Controler",result.status);
 						this._router.navigate(['/usuarios/'+result.json().id]);
 					}else{
 						//204 -- No Content
 						console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					console.log(<any>error);
 				})
	};


}



