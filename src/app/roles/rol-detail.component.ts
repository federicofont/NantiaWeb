import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';
import { RolService } from './rol.service';
import { Rol } from './rol.model';

@Component ({
	selector: 'rol-detail',
	templateUrl: './rol-detail.html',
	providers: [RolService],
	styleUrls: ['./roles.style.css']
})


export class RolDetailComponent{
	public titulo: string;
	rol: Rol = new Rol();
	public id:number;

	constructor(private _rolService: RolService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute)
	{

		this._activatedRoute.params
			.subscribe( parametros=>{
			////console.log(("id",parametros.id);
			this.id = parametros['id'];
			})


		if(this.id != null){
			this.titulo = 'Editar Rol';
		}else{
			this.titulo = 'Nuevo Rol';	
		} 

	}
	
	ngOnInit(){
		////console.log(('rol-add.component.ts cargado');

		if(this.id != null){
			this.getRol();
		}

	}


	getRol(){
		this._rolService.getRol(this.id).subscribe(
			(result : any) =>{
				if(result){
					////console.log(("Result:",result.json());
					 this.rol = result;
				}else{
					//console.log("ID:",this.id," Result Controler:",result.status);
				}

			},
			error =>{
				//console.log(<any>error);
			}
		)
	}


};
