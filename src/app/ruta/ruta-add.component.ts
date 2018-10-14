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
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}
	 

	ngOnInit(){
		if(this.id != null){
			//this.getCliente(id);
			this.getRuta(this.id);
			this.titulo = 'Editar Ruta'
		
		}else{
			this.titulo = 'Nueva Ruta'
			this.getClientes();
		}	
		

	}


	getClientes(){
		this._clienteSerivce.getClientes().subscribe(
			result =>{
				if(result.status == 200){
					 this.clientes = result.json();
					 console.log("Clientes:",result.json());
				}else{
					console.log("Result Controler",result.status); 
				}
			},
			error =>{
				console.log(<any>error);
			}
		);
	}

	getRuta(id:number){
		this._rutaService.getRuta(id).subscribe(
			result =>{
				if(result.status == 200){
					 this.ruta = result.json();
					 console.log("Ruta_Result:",result.json());
					 console.log("Ruta:",this.ruta);
				}else{
					console.log("Result Controler",result.status); 
				}
			},
			error =>{
				console.log(<any>error);
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
		//console.log("this.ruta",this.ruta);

		if (this.id==null) {
			// Add ruta		
			this._rutaService.addRuta(this.ruta)
				.subscribe(result => {
 					if(result.status==201){
 						console.log("Ruta",this.ruta);
 						//this._router.navigate(['/ruta/']);
 						//this._router.navigate(['/rutas/'+result.json().id]);
 					}else{
 						console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					console.log(<any>error);
 				})
 		}else{
 			// Update ruta

			// this.ruta=rutaAdd.value;
			// this.ruta.id=this.id;
			// //console.log("ruta:",this.ruta);
		
			// this._rutaService.updateRuta(this.ruta)
			// 	.subscribe(result => {
			// 	//console.log("Result Controler",result.status);
 		// 			if(result.status==200){
 		// 				this._router.navigate(['/rutas/'+result.json().id]);
 		// 			}else{
 		// 				//204 -- No Content
 		// 				//console.log("Result Controler",result.status);
			// 		}
 		// 		},
 		// 		error => {
 		// 			//console.log(<any>error);
 		// 		})
 		 }

	}


	addClienteLista(formclienteAdd:NgForm){	
		//Cargo el objeto envase y el arreglo envases
		//console.log("Conectado a addProductoLista");
		var ind:number=0;
		console.log(formclienteAdd.controls);
		var idCliente:number = formclienteAdd.controls['clienteId'].value;
		//console.log("this.envases",this.envases);
    	for (var i = this.clientes.length - 1; i >= 0; i--) {
			if(this.clientes[i].id == idCliente)
				ind = i;
			//else
				//console.log("i",i);
		}

		const nuevo_RutaCliente = new RutaCliente( null,
											this.clientes[ind],
											formclienteAdd.controls['ordenVisita'].value
											);

		//console.log("nuevo_RutaCliente",nuevo_RutaCliente);
		this.ruta.setRutaCliente.push(nuevo_RutaCliente);
		console.log("this.ruta.setRutaCliente",this.ruta.setRutaCliente);
		//this.getProductosLista();
	}



}