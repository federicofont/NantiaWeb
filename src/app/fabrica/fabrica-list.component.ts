import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FabricaService } from './fabrica.service';
import { Fabrica} from './fabrica.model';

@Component({
	selector: 'fabricas-list',
	templateUrl: '../fabrica/fabrica-list.html',
	providers: [FabricaService],
	styleUrls: ['./fabrica.style.css']
})
export class FabricaListComponent{
	public titulo: string;
	public fabrica:Fabrica;
	public fabricas: Fabrica[];

	public id:number;

	
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _fabricaService: FabricaService
	){
		this.titulo = 'Listado de fabricas';
		this._activatedRoute.params
			.subscribe( parametros=>{
			this.id = parametros['id'];
			})
	}

	ngOnInit(){

		if (this.id==null) {
			this.getFabricas();
		}else{
			this.getFabrica(this.id);
		}

	}
	

	getFabricas(){
		this._fabricaService.getFabricas().subscribe(
			(result : any) =>{
				if (result.length > 0) {
					 this.fabricas = result;
					 console.log(this.fabricas);
					// //console.logresult.json());
				}else{
				//	//console.log("Result Controler",result.status); 
				}
			},
			error =>{
				//console.log(<any>error);
			}
		);
	}

	getFabrica(id){
		this._fabricaService.getFabrica(id).subscribe(
			(result : Fabrica) =>{
				if (result.id > 0) {
					 this.fabrica = result;
				//	 //console.log("GetFabrica",result.json());
				}else{
				//	//console.log("ID:",this.id," Result Controler:",result.status);
				}

			},
			error =>{
				//console.log(<any>error);
			}
		);
	}


	public confirmado;

	borrarConfirm(id){
		this.confirmado=id;
	}

	cancelarConfirm(){
		this.confirmado=null;
	}

	onDelete(id){
		this._fabricaService.deleteFabrica(id).subscribe(
			(result : any) =>{
				if (result == null) {
					this.getFabricas();
				}else{
					alert("Error al borrar fabrica")
				}
			},
			error =>{
				//console.log(<any>error);
			}
		);
	}


}