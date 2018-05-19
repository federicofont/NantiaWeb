import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario} from '../models/usuario.model';

@Component({
	selector: 'usuarios-list',
	templateUrl: '../views/usuarios-list.html',
	providers: [UsuarioService]
})
export class UsuariosListComponent{
	public titulo: string;
	public usuario:Usuario;
	public usuarios: Usuario[];

	public id:number;

	
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _usuarioService: UsuarioService
	){
		this.titulo = 'Listado de usuarios';
		this._activatedRoute.params
			.subscribe( parametros=>{
			console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}

	ngOnInit(){
		console.log('Usuarios-list.compoent.ts cargado');
		//alert(this._usuarioService.getUsuarios());
		if (this.id==null) {
			this._usuarioService.getUsuarios().subscribe(
				result =>{
					console.log(result.status);
					if(result.code !=200){
						 console.log(result);
						 this.usuarios = result;
					}else{
						this.usuarios = result.data;
					}

				},
				error =>{
					console.log(<any>error);
				}
			);
		}else{
			console.log("Entre al else")
			this._usuarioService.getUsuario(this.id).subscribe(
				result =>{
					//console.log(result.status);
					if(result.code !=200){
						 console.log(result);
						 this.usuario = result;
					}else{
						this.usuario = result.data;
					}

				},
				error =>{
					console.log(<any>error);
				}
			);
		}
	}

}