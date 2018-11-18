import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UsuarioService } from '../usuarios/usuario.service';
import { Usuario } from './usuario.model';

import { RolService } from '../roles/rol.service';
import { Rol } from '../roles/rol.model';

@Component({
	selector: 'formUsuarioAdd',
	templateUrl: '../usuarios/usuario-add.html',
	providers: [UsuarioService, RolService],
	styleUrls: ['./usuario.style.css']
})

export class UsuarioAddComponent {

	id: number;

	usuario: Usuario = new Usuario();
	rol: Rol = new Rol();
	roles: Rol[] = [];

	nuevo: boolean = false;
	titulo: string = null;

	constructor(private _usuarioService: UsuarioService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _rolService: RolService
	) {


		this._activatedRoute.params
			.subscribe(parametros => {
				////console.log("id",parametros.id);
				this.id = parametros['id'];
			})

		if (this.id != null) {
			this.titulo = 'Editar Usuario'
		} else {
			this.titulo = 'Nuevo Usuario';
		}

		this._activatedRoute.params
			.subscribe(parametros => {
				////console.log(("id",parametros.id);
				this.id = parametros['id'];
			})
	}


	ngOnInit() {
		////console.log(('usuario-add.component.ts cargado');
		this.getRoles();
		if (this.id != null) {
			this.getUsuario(this.id);
		}
		//this.getRoles();

	}


	getRoles() {
		this._rolService.getRoles().subscribe(
			(result: any) => {
				//console.log(result.status);
				if (result.body.length > 0) {
					this.roles = result.body;
				//	console.log(this.roles);
				} else {
					//console.log("Result Controler",result.status); 
				}
			},
			error => {
				//console.log(<any>error);
			}
		);
	}

	getUsuario(id: number) {
		this._usuarioService.getUsuario(id).subscribe(
			(result: any) => {
				//console.log(result);
				if (result.id > 0) {
					//console.log("status:",result.status);
					this.usuario = result;
					// console.log("Usuario",this.usuario);
					this.rol = this.usuario.rol;

				} else {
					//console.log("ID:",this.id," Result Controler:",result.status);
				}

			},
			error => {
				//console.log(<any>error);
			}
		)
	}

	guardar(usuarioAdd: NgForm) {

		this.usuario = usuarioAdd.value;
		////console.log(("Rol Seleccionado", usuarioAdd.controls['rolId'].value);
		//Cargo el objeto ROL
		this.setRol(usuarioAdd.controls['rolId'].value);

		this.usuario.rol = this.rol;
		////console.log(("Usuario:",this.usuario);

		if (this.id != null) {
			this.usuario.id = this.id;
			this.updateUsuario();
		} else {
			this.addUsuario();
		}

	}

	setRol(id) {
		//console.log("Set Rol");
		var ind: number = 0;
		var idRol: number = id;

		//recupero el objeto ROL del arre de Roles
		for (var i = this.roles.length - 1; i >= 0; i--) {
			if (this.roles[i].id == idRol)
				ind = i;
			//else
			////console.log(("i",i);
		}

		this.rol = this.roles[ind];

	}

	addUsuario() {
		//console.log("ADD");
		this._usuarioService.addUsuario(this.usuario)
			.subscribe((result: any) => {
				if (result.id) {
					this._router.navigate(['/usuarios'/*/'+result.json().id*/]);
				} else {
					//console.log("Result Controler",result.status);
				}
			},
				error => {
					//console.log(<any>error);
				})
	}

	updateUsuario() {
		//console.log("Update");
		this._usuarioService.editUsuario(this.id, this.usuario)
			.subscribe((result: any) => {
				if (result.id) {
					//console.log("Result Controler",result.status);
					this._router.navigate(['/usuarios']);
				} else {
					//204 -- No Content
					//console.log("Result Controler",result.status);
				}
			},
				error => {
					//console.log(<any>error);
				})
	};


}



