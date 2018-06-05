import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.model';

@Component ({
	selector: 'cliente-detail',
	templateUrl: './cliente-detail.html',
	providers: [ClienteService]
})

export class ClienteDetailComponent{
	public titulo: string;
	public cliente:Cliente;
	public id:number;

	constructor(private _clienteService: ClienteService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute)
		{
		this.titulo = 'Cliente';

		this._activatedRoute.params
			.subscribe( parametros=>{
			console.log("id",parametros.id);
			this.id = parametros['id'];
			})
		}
	
	ngOnInit(){
		console.log('cliente-detail.component.ts cargado');

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


	}
