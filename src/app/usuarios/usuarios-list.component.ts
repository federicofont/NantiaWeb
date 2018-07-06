import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../usuarios/usuario.service';
import { Usuario} from './usuario.model';

@Component({
	selector: 'usuarios-list',
	templateUrl: '../usuarios/usuarios-list.html',
	providers: [UsuarioService]
})
export class UsuariosListComponent{
	public titulo: string;
	public usuario:Usuario;
	public usuarios: Usuario[];

	public confirmado:number;
	public id:number;

	
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _usuarioService: UsuarioService
	){
		this.titulo = 'Listado de usuarios';
		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}

ngOnInit(){

		if (this.id==null) {

			this.getUsuarios();

		}else{

			this.getUsuario();
			
		}

	}


		getUsuarios(){
			this._usuarioService.getUsuarios().subscribe(
	            result => {
	                if(result.status == 200){
	                	this.usuarios = result.json();
	                	console.log("this.usuarios:",this.usuarios);
	                }else{
	                	console.log("Result Controler",result.status);   
	                }
	            },
	            error => {
	                console.log(<any>error);
	            }
	        );
		}

		getUsuario(){
			this._usuarioService.getUsuario(this.id).subscribe(
				result =>{
					if(result.status == 200){
						 this.usuario = result.json();
					}else{
						console.log("ID:",this.id," Result Controler:",result.status);
					}

				},
				error =>{
					console.log(<any>error);
				}
			);
		}

		borrarConfirm(id){
			this.confirmado=id;
		}

		cancelarConfirm(){
			this.confirmado=null;
		}

		onDeleteUsuario(id){
			this._usuarioService.deleteUsuario(id).subscribe(
				result =>{
					if(result.status == 200){
						this.getUsuarios();
					}else{
						alert("Error al borrar Usuario")
					}
				},
				error =>{
					console.log(<any>error);
				}
			);
		}

}