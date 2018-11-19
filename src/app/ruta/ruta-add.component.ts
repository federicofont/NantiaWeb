import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { RutaService } from './ruta.service';
import { Ruta } from './ruta.model';
import { RutaCliente } from './rutaCliente.model';

import { Cliente } from '../clientes/cliente.model';
import { ClienteService } from '../clientes/cliente.service';
import { ClientesListComponent } from '../clientes/clientes-list.component';

import { Dias } from '../dias';
import { forkJoin } from 'rxjs/observable/forkJoin';


@Component({
	selector: 'formRutaAdd',
	templateUrl: '../ruta/ruta-add.html',
	providers: [RutaService, ClienteService, ClientesListComponent, Dias],
	styleUrls: ['./ruta.style.css']
})

export class RutaAddComponent {
	public titulo: string;

	cliente = new Cliente();
	clientes: Cliente[] = [];
	ruta = new Ruta();
	rutaCliente = new RutaCliente;
	//setRutaCliente : RutaCliente[] = [];
	dias: boolean[] = [];

	nuevo: boolean = false;
	id: number;

	constructor(private _rutaService: RutaService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _clientesListComponent: ClientesListComponent,
		private _clienteSerivce: ClienteService,
		private _dias: Dias
	) {

		this._activatedRoute.params
			.subscribe(parametros => {
				////console.log(("id",parametros.id);
				this.id = parametros['id'];
			})
	}


	ngOnInit() {
		if (this.id != null) {
			this.getClientes();
			//this.getRuta(this.id);
			this.titulo = 'Editar Ruta'

		} else {
			this.titulo = 'Nueva Ruta'
			this.getClientes();
		}


	}


	getClientes() {
		let a1 = this._clienteSerivce.getClientes();
		let a2 = this._rutaService.getRuta(this.id);

		forkJoin([a1, a2]).subscribe(result => {
			//console.log("clientes result",result);
			if (result[0].length > 0) {
				this.clientes = result[0];				
				//	 console.log("Clientes:",this.clientes);
			} else {
				//console.log("Result Controler",result.status); 
			}

			if (result[1].id > 0) {
				this.ruta = result[1];
				//console.log("Ruta_Result:",result.json());
				this.borroClientes();
			} else {
				//console.log("Result Controler",result.status); 
			}
		})

		/*this._clienteSerivce.getClientes().subscribe(
			(result: any) => {
				//console.log("clientes result",result);
				if (result.length > 0) {
					this.clientes = result;
					this.borroClientes();
					//	 console.log("Clientes:",this.clientes);
				} else {
					//console.log("Result Controler",result.status); 
				}
			},
			error => {
				console.log(<any>error);
			}
		);

		this._rutaService.getRuta(this.id).subscribe(
			(result: any) => {
				if (result.id > 0) {
					this.ruta = result;
					//console.log("Ruta_Result:",result.json());
					this.borroClientes();
				} else {
					//console.log("Result Controler",result.status); 
				}
			},
			error => {
				console.log(<any>error);
			}
		);*/
	}

	borroClientes() {
		//console.log("Rutaaa:",this.ruta);

		this.clientes = this.clientes.filter(x => !this.ruta.setRutaCliente.find(c => c.cliente.id === x.id));

/*		for (var i = this.clientes.length - 1; i >= 0; i--) {
			//console.log(i);
			for (var j = this.ruta.setRutaCliente.length - 1; j >= 0; j--) {
				//console.log(j);
				//console.log("i=",i,this.clientes[i].id,"j=",j, this.ruta.setRutaCliente[j].cliente.id);
				if (this.clientes[i].id == this.ruta.setRutaCliente[j].cliente.id) {
					//Quito del arreglo el cliente
					//console.log(this.clientes[i].nombre1);
					this.clientes.splice(i, 1);
				}
			}
		}
	*/
	}

	guardar(rutaAdd: NgForm) {

		//Obtengo enumerado de dias a partir de los ids
		/* for (var i = this.dias.length - 1; i >= 0; i--) {
			 if(this.dias[i] == true){
				 this.ruta.dias = this._dias.getDia(i);
				 /* Si recibiera varios dias*/
		//this.ruta.dias.push(this._dias.getDia(i))
		//	}
		//}
		this.ruta.dias = rutaAdd.controls.dias.value;

		if (this.id == null) {
			// Add ruta		
			this._rutaService.addRuta(this.ruta)
				.subscribe((result: any) => {
					if (result.id > 0) {
						this._router.navigate(['/ruta']);
					} else {
						//console.log("Result Controler",result.status);
					}
				},
					error => {
						console.log(<any>error);
					})
		} else {
			// Update ruta

			this._rutaService.editRuta(this.ruta)
				.subscribe((result: any) => {
					if (result.id > 0) {
						this._router.navigate(['/ruta']);
						// 			}else{
						// 				//204 -- No Content
						// 				////console.log(("Result Controler",result.status);
					}
				},
					error => {
						console.log(<any>error);
					})
		}

	}


	addClienteLista(formclienteAdd: NgForm) {
		//Cargo el objeto envase y el arreglo envases
		var ind: number = 0;
		//console.logformclienteAdd.controls);
		var idCliente: number = formclienteAdd.controls['clienteId'].value;
		////console.log(("this.envases",this.envases);
		for (var i = this.clientes.length - 1; i >= 0; i--) {
			if (this.clientes[i].id == idCliente)
				ind = i;
			//else
			////console.log(("i",i);
		}

		const nuevo_RutaCliente = new RutaCliente(null,
			this.clientes[ind],
			1 //formclienteAdd.controls['ordenVisita'].value
		);

		////console.log(("nuevo_RutaCliente",nuevo_RutaCliente);
		this.ruta.setRutaCliente.push(nuevo_RutaCliente);
		//console.log("this.ruta.setRutaCliente",this.ruta.setRutaCliente);
		//this.getProductosLista();
		if (this.ruta.setRutaCliente[ind]) {
			//Quito del arreglo el cliente
			this.clientes.splice(ind, 1);
		}
	}



}