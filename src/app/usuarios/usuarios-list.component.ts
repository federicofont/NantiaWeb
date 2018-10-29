import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../usuarios/usuario.service';
import { Usuario} from './usuario.model';

@Component({
	selector: 'usuarios-list',
	templateUrl: '../usuarios/usuarios-list.html',
	providers: [UsuarioService],
	styleUrls: ['./usuario.style.css']
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
			////console.log(("id",parametros.id);
			this.id = parametros['id'];
			})
	}

ngOnInit(){

		if (this.id==null) {

			this.getUsuarios();

		}else{

			this.getUsuario(this.id);
			
		}

	}


		getUsuarios(){
			this._usuarioService.getUsuarios().subscribe(
	            (result : any) =>{
	                if (result.length > 0) {
	                	this.usuarios = result;//.json();
	                }else{
	                //	//console.log("Result Controler",result.status);   
	                }
	            },
	            error => {
	                //console.log(<any>error);
	            }
	        );
		}

		getUsuario(id){
			this._usuarioService.getUsuario(id).subscribe(
				(result : any) =>{
					if (result.length > 0) {
						 this.usuario = result;
					}else{
						//console.log("ID:",id," Result Controler:",result.status);
					}

				},
				error =>{
					//console.log(<any>error);
				}
			);
		}

		borrarConfirm(id){
			this.confirmado=id;
		}

		cancelarConfirm(){
			this.confirmado=null;
		}

		onDelete(id){
			this._usuarioService.deleteUsuario(id).subscribe(
				(result : any) =>{
					if (result==null) {
						this.getUsuarios();
					}else{
						alert("Error al borrar Usuario")
					}
				},
				error =>{
					//console.log(<any>error);
				}
			);
		}

}