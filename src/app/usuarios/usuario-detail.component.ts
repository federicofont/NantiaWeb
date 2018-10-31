import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.model';
import { RolService } from '../roles/rol.service';
import { Rol } from '../roles/rol.model';

@Component ({
	selector: 'usuario-detail',
	templateUrl: './usuario-detail.html',
	providers: [UsuarioService, RolService],
	styleUrls: ['./usuario.style.css']
})

export class UsuarioDetailComponent{

	public titulo: string;

	usuario: Usuario = new Usuario();
	rol: Rol = new Rol();
	roles: Rol[] = [];

	nuevo: boolean = false;
	id: number;

	constructor(private _usuarioService: UsuarioService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute,
				private _rolService: RolService)
		{
		this.titulo = 'Usuario';

		this._activatedRoute.params
			.subscribe( parametros=>{
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


};
