import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.model';
import { Marcador } from './marcador.model';
import { Direccion } from './direccion.model';

@Component ({
	selector: 'cliente-detail',
	templateUrl: './cliente-detail.html',
	providers: [ClienteService],
	styleUrls: ['./cliente.style.css']
})

export class ClienteDetailComponent{
	public titulo: string;
	nuevo:boolean=false;
	id:number;
	marcadores:Marcador[]=[];

	  //Posicion Inicial
	  lat: number =  -34.4549810;
	  lng: number = -56.3999980;
	  zoom:number = 14;

	marcador : Marcador = new Marcador("Nantia",this.lat, this.lng,false);
	direccion : Direccion = new Direccion();
	cliente : Cliente = new Cliente();

	constructor(private _clienteService: ClienteService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute)
		{
		this.titulo = 'Cliente';

		this._activatedRoute.params
			.subscribe( parametros=>{
			this.id = parametros['id'];
			})
		}
	
	ngOnInit(){

		this._clienteService.getCliente(this.id).subscribe(
				(result:Cliente) =>{
					this.cliente = result;
					/*if(result.status = 200){
						 this.cliente = result.json();
						 console.log("this.cliente",this.cliente);
					}else{
						////console.log("ID:",this.id," Result Controler:",result.status);
					}*/

				},
				error =>{
					////console.log(<any>error);
				}
			)
		};

	}
