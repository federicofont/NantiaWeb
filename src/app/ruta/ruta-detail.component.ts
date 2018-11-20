import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { RutaService } from './ruta.service';
import { Ruta } from './ruta.model';
import { RutaCliente } from './rutaCliente.model';

import { Cliente } from '../clientes/cliente.model';
import { ClienteService } from '../clientes/cliente.service';
import { ClientesListComponent } from '../clientes/clientes-list.component';

import { Dias } from '../dias';



@Component ({
	selector: 'formRutaDetail',
	templateUrl: '../ruta/ruta-detail.html',
	providers: [RutaService, ClienteService, ClientesListComponent, Dias],
    styleUrls: ['./ruta.style.css']
})

export class RutaDetailComponent{
	public titulo: string;
	
	cliente = new Cliente();
	clientes : Cliente[]=[];
	ruta = new Ruta();
	rutaCliente = new RutaCliente;
	//setRutaCliente : RutaCliente[] = [];
	dias : boolean[]=[];

	nuevo:boolean=false;
	id:number;

	constructor(private _rutaService: RutaService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute,
				private _clientesListComponent:ClientesListComponent,
				private _clienteSerivce:ClienteService,
				private _dias:Dias
				){

		this._activatedRoute.params
			.subscribe( parametros=>{
			////console.log(("id",parametros.id);
			this.id = parametros['id'];
			})
	}
	 

	ngOnInit(){
		if(this.id != null){
			this.getClientes();
			this.getRuta(this.id);
			this.titulo = 'Ruta'
		
		}else{
			this.titulo = 'Nueva Ruta'
			this.getClientes();
		}	
		

	}


	getClientes(){
		this._clienteSerivce.getClientes().subscribe(
			(result : any) =>{
				//console.log("clientes result",result);
				if (result.length > 0) {
					 this.clientes = result;
				//	 console.log("Clientes:",this.clientes);
				}else{
					//console.log("Result Controler",result.status); 
				}
			},
			error =>{
				//console.log(<any>error);
			}
		);
	}

	getRuta(id:number){
		this._rutaService.getRuta(id).subscribe(
			(result : any) =>{
				if (result.id > 0) {
					 this.ruta = result;
					 //console.log("Ruta_Result:",result.json());
					 //console.log("Ruta:",this.ruta);
				}else{
					//console.log("Result Controler",result.status); 
				}
			},
			error =>{
				//console.log(<any>error);
			}
		);
	}

	


}