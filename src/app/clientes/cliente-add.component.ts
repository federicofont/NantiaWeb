import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.model';
import { Direccion } from './direccion.model';

@Component ({
	selector: 'formClienteAdd',
	templateUrl: './cliente-add.html',
	providers: [ClienteService],
	styles: [`
		.ng-invalid.ng-touched:not(form){
		border:1px solid red;
		}`]
})

export class ClienteAddComponent{
	
	public titulo: string;
	nuevo:boolean=false;
	id:number;

	/*Creo los objetos que voy a referenciar y editar en el HTML*/
	direccion : Direccion = new Direccion();
	cliente : Cliente = new Cliente();

	constructor(private _clienteService: ClienteService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute){
		
		this.titulo = 'Nuevo Cliente';

		this._activatedRoute.params
			.subscribe( parametros=>{
			console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}
	 

	ngOnInit(){
		console.log('cliente-add.component.ts cargado');	
	}

	guardar(clienteAdd:NgForm){
		console.log("cliente ADD/Update ID:", this.id);
		//if (this.id==null) {
			// Add user
		
			//Creo el cliente desde el formulario
			//this.cliente=clienteAdd.value;

			//Asigno el objeto direccion dentro del objeto cliente
			this.cliente.direccion = this.direccion;
			
			//Llamo al servicio que creara el nuevo cliente
			this._clienteService.addCliente(this.cliente)
				.subscribe(result => {
 					if(result.status==201){
 						console.log("Result Controler",result.status);
 						//this._router.navigate(['/clientes/'+result.json().id]);
 					}else{
 						console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					console.log(<any>error);
 				})
 		//}else{
 			// Update user
			
			//Actualizo el cliente desde el formulario
			// this.cliente=clienteAdd.value;
			// this.cliente.id=this.id;
			// console.log("cliente:",this.cliente);
		
			// this._clienteService.updateCliente(this.cliente)
			// 	.subscribe(result => {
			// 	console.log("Result Controler",result.status);
 		// 			if(result.status==200){
 		// 				this._router.navigate(['/clientes/'+result.json().id]);
 		// 			}else{
 		// 				//204 -- No Content
 		// 				console.log("Result Controler",result.status);
			// 		}
 		// 		},
 		// 		error => {
 		// 			console.log(<any>error);
 		// 		})
 		// }

	}
}