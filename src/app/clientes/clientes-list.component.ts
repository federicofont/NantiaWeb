import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from './cliente.service';
import { Cliente} from './cliente.model';

@Component({
	selector: 'clientes-list',
	templateUrl: './clientes-list.html',
	providers: [ClienteService]
})
export class ClientesListComponent{
	public titulo: string;
	public cliente:Cliente;
	public clientes: Cliente[];

	public id:number;

	
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _clienteService: ClienteService
	){
		this.titulo = 'Listado de clientes';
		this._activatedRoute.params
			.subscribe( parametros=>{
			console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}

	ngOnInit(){
		console.log('Clientes-list.compoent.ts cargado');
		console.log('ID:', this.id);
		
		if (this.id ==null) {
			console.log("Listo todos los clientes");
			this.getClientes();
		}else{
			console.log("Listo el cliente con ID:",this.id)
			this._clienteService.getCliente(this.id).subscribe(
				result =>{
					console.log('status',result.status);
					if(result.status == 200){
						console.log('Result',result.json());
						 this.cliente = result.json();
					}else{
						console.log("ID:",this.id," Result Controler:",result.status);
					}

				},
				error =>{
					console.log(<any>error);
				}
			);
		}
}
		getClientes(){
			this._clienteService.getClientes().subscribe(
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

		getCliente(){
			this._clienteService.getCliente(this.id).subscribe(
		 		result =>{
		 			if(result.status == 200){
		 				 console.log('Cliente:',this.cliente = result.json())
		 				 this.cliente = result.json();
		 			}else{
						console.log("ID:",this.id," Result Controler:",result.status);
		 			}
		 		},
		 		error =>{
		 			console.log(<any>error);
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

		onDeleteCliente(id){
			this._clienteService.deleteCliente(id).subscribe(
				result =>{
					if(result.status == 200){
						this.getClientes();
					}else{
						alert("Error al borrar producto")
					}
				},
				error =>{
					console.log(<any>error);
				}
			);
		}

}