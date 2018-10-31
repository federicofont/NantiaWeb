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
	selector: 'formRutaAdd',
	templateUrl: '../ruta/ruta-add.html',
	providers: [RutaService, ClienteService, ClientesListComponent, Dias],
    styleUrls: ['./ruta.style.css']
})

export class RutaAddComponent{
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
			this.titulo = 'Editar Ruta'
		
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

	guardar(rutaAdd:NgForm){

	    //Obtengo enumerado de dias a partir de los ids
	    for (var i = this.dias.length - 1; i >= 0; i--) {
			if(this.dias[i] == true){
				this.ruta.dias = this._dias.getDia(i);
				/* Si recibiera varios dias*/
				//this.ruta.dias.push(this._dias.getDia(i))
			}
		}

		//this.ruta.dias=null;
		////console.log(("this.ruta",this.ruta);

		if (this.id==null) {
			// Add ruta		
			this._rutaService.addRuta(this.ruta)
				.subscribe((result : any) => {
 					if(result.id > 0){
 						//console.log("Ruta",this.ruta);
 						this._router.navigate(['/ruta']);
 					}else{
 						//console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					//console.log(<any>error);
 				})
 		}else{
 			// Update ruta

			// this.ruta=rutaAdd.value;
			// this.ruta.id=this.id;
			// ////console.log(("ruta:",this.ruta);
		
			 this._rutaService.editRuta(this.ruta)
			 	.subscribe((result : any) => {
			// 	////console.log(("Result Controler",result.status);
 		 			if(result.id > 0){
 		 				this._router.navigate(['/ruta']);
 		// 			}else{
 		// 				//204 -- No Content
 		// 				////console.log(("Result Controler",result.status);
			 		}
 		 		},
 		 		error => {
 		// 			////console.log((<any>error);
 		 		})
 		 }

	}


	addClienteLista(formclienteAdd:NgForm){	
		//Cargo el objeto envase y el arreglo envases
		////console.log(("Conectado a addProductoLista");
		var ind:number=0;
		//console.logformclienteAdd.controls);
		var idCliente:number = formclienteAdd.controls['clienteId'].value;
		////console.log(("this.envases",this.envases);
    	for (var i = this.clientes.length - 1; i >= 0; i--) {
			if(this.clientes[i].id == idCliente)
				ind = i;
			//else
				////console.log(("i",i);
		}

		const nuevo_RutaCliente = new RutaCliente( null,
											this.clientes[ind],
											formclienteAdd.controls['ordenVisita'].value
											);

		////console.log(("nuevo_RutaCliente",nuevo_RutaCliente);
		this.ruta.setRutaCliente.push(nuevo_RutaCliente);
		//console.log("this.ruta.setRutaCliente",this.ruta.setRutaCliente);
		//this.getProductosLista();
	}



}