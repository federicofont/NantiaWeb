import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.model';
import { Marcador } from '../models/marcador.model';
import { Direccion } from './direccion.model';

@Component ({
	selector: 'cliente-detail',
	templateUrl: './cliente-detail.html',
	providers: [ClienteService],
	styleUrls: ['./mapa.style.css']
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
		
	/*Creo los objetos que voy a referenciar y editar en el HTML*/
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
		console.log('cliente-detail.component.ts cargado');

		this._clienteService.getCliente(this.id).subscribe(
				result =>{
					if(result.status = 200){
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
