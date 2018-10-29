import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';
import { RolService } from './rol.service';
import { Rol } from './rol.model';

@Component ({
	selector: 'rol-detail',
	templateUrl: './rol-detail.html',
	providers: [RolService]
})

export class RolDetailComponent{
	public titulo: string;
	rol: Rol = new Rol();
	public id:number;

	constructor(private _rolService: RolService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute)
		{
		this.titulo = 'Rol';

		this._activatedRoute.params
			.subscribe( parametros=>{
			////console.log(("id",parametros.id);
			this.id = parametros['id'];
			})
		}
	
	ngOnInit(){
		////console.log(('rol-detail.component.ts cargado');

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
		};


	}
