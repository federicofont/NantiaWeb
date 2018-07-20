import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.model';

@Component ({
	selector: 'usuario-detail',
	templateUrl: './usuario-detail.html',
	providers: [UsuarioService]
})

export class UsuarioDetailComponent{
	public titulo: string;
	usuario: Usuario = new Usuario();
	public id:number;

	constructor(private _usuarioService: UsuarioService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute)
		{
		this.titulo = 'Usuario';

		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})
		}
	
	ngOnInit(){
		//console.log('usuario-detail.component.ts cargado');

		this._usuarioService.getUsuario(this.id).subscribe(
				result =>{
					if(result.status == 200){
						 this.usuario = result.json();
						 console.log("Result:", this.usuario);
					}else{
						console.log("ID:",this.id," Result Controler:",result.status);
					}

				},
				error =>{
					console.log(<any>error);
				}
			)
		};


	}
