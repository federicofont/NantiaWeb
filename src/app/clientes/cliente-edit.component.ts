import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.model';

@Component ({
	selector: 'formCliente-edit',
	templateUrl: './cliente-add.html',
	providers: [ClienteService],
	styles: [`
		.ng-invalid.ng-touched:not(form){
		border:1px solid red;
		}`]
})

export class ClienteEditComponent{
	public titulo: string;
	public is_edit;

/*cliente: Cliente = {
	id : null,
	tipoDocumento : null, 
	nroDocumento : null, 
	nombre1: null, 
	nombre2: null, 
	saldo : null, 
	fechaNacimiento : null, 
	fechaAlta : null, 
	celular : null, 
	mail : null, 
	envases : null, 
	idLista : null, 
	observaciones : null, 		
	activo : null
}
	id:number;

	constructor(private _clienteService: ClienteService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute){
		
		this.titulo = 'Editar Cliente';
		this.is_edit = true;

		this._activatedRoute.params
			.subscribe( parametros=>{
			console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}
	 

	ngOnInit(){
		console.log('cliente-add.component.ts cargado');
		this.getCliente();
	}

	getCliente(){
	this._clienteService.getCliente(this.id).subscribe(
				result =>{
					if(result.status == 200){
						console.log("Result:",result.json());
						 this.cliente = result.json();
					}else{
						console.log("ID:",this.id," Result Controler:",result.status);
					}

				},
				error =>{
					console.log(<any>error);
				}
			)
	};

	guardar(clienteAdd:NgForm){
		this.updateCliente();
	}

	updateCliente(){
		this._clienteService.editCliente(this.id, this.cliente)
				.subscribe(result => {
				console.log("Result Controler",result.status);
 					if(result.status==200){
 						this._router.navigate(['/clientes/'+result.json().id]);
 					}else{
 						//204 -- No Content
 						console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					console.log(<any>error);
 				})
	};

*/	
}