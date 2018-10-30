import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ClienteService } from '../clientes/cliente.service';
import { Cliente } from '../clientes/cliente.model';
import { Direccion } from '../clientes/direccion.model';
import { Marcador } from './marcador.model';

@Component({
	selector: 'formMapaCli',
	templateUrl: './mapaCli.html',
	providers: [ClienteService],
	styleUrls: ['./mapa.style.css']
})

export class MapaCliComponent {

	public titulo: string;

	id: number;
	marcadores: Marcador[] = [];

	//Posicion de referencia de mapa
	lat: number = -34.4549810;
	lng: number = -56.3999980;
	zoom: number = 14;

	//marcador : Marcador = new Marcador("Nantia",this.lat, this.lng,false);

	/*Creo los objetos que voy a referenciar y editar en el HTML*/
	direccion: Direccion = new Direccion();
	cliente: Cliente = new Cliente();
	clientes: Cliente[] = [];

	constructor(private _clienteService: ClienteService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute
	) {

		this.titulo = 'Mapa de Clientes';

	}


	ngOnInit() {
		this.marcadores = [];

		this.getClientes();

	}


	marcadorCliqueado(marcador: Marcador, index: number) {
		console.log("Marcador cliqueado: ", marcador);

	}

	agregarMarcador(evento) {
		//console.log("agregarMarcador")
		//limpio el arreglo para que quede solo 1 marcador
		this.marcadores = [];

		const coords: { lat: number, lng: number } = evento.coords;
		const nuevoMarcador = new Marcador("Direccion", coords.lat, coords.lng, true);
		//publico
		this.marcadores.push(nuevoMarcador);
		//console.log("agregarMarcador", this.marcadores);

		this.actualizarMarcador(/*actuaMarcador,*/ coords.lat, coords.lng, 0);
		//guardo cambios
		//this.guardarStorage(this.marcadores);
		////console.log(evento);
		//////console.log(evento.coords.lat);
	}

	//guardarStorage(marcadoresAux:Marcador[]){
	//console.log("guardarStorage");
	//borro el local storage de "marcadores"
	//localStorage.removeItem('marcadores');
	//guardo el nuevo item
	//localStorage.setItem('marcadores',JSON.stringify( marcadoresAux ) );
	////console.log("Marcadores: ", marcadoresAux);
	//}

	borrarMarcador(i: number) {
		//borro elementos de un arreglo
		this.marcadores.splice(i, 1);
		//guardo el nuevo localStorage sin el eleento.
		// this.guardarStorage(this.marcadores);
	}

	posicionFinalMarcador(marcador: any, $event: any, posicion: number) {
		//console.log("Posicion Final:",marcador,$event);

		// 	var actuaMarcador ={
		// 		Nombre: marcador.nombre,
		// 		Lat: parseFloat(marcador.lat) ,
		// 		Long:parseFloat(marcador.lng),
		// 		Movil: true
		// 	}

		var nuevaLat = $event.coords.lat;
		var nuevaLong = $event.coords.lng;

		//console.log('nuevaLat: ', nuevaLat, "nuevaLong", nuevaLong);

		this.actualizarMarcador(/*actuaMarcador,*/ nuevaLat, nuevaLong, posicion);
	}


	actualizarMarcador(/*marker_aux,*/nuevaLatAux, nuevaLongAux, posicion) {
		//Obtener marcadores
		//console.log("actualizarMarcador")
		//var marcadoresLS =JSON.parse(localStorage.getItem('marcadores'));

		//marcadoresLS[posicion].lat = nuevaLatAux;
		//marcadoresLS[posicion].lng = nuevaLongAux;

		this.direccion.coordLat = nuevaLatAux;
		this.direccion.coordLon = nuevaLongAux;

		//this.marcadores[posicion].lat = nuevaLatAux;
		//this.marcadores[posicion].lng = nuevaLongAux;
		//console.log("this.direccion", this.direccion);
		//this.guardarStorage(marcadoresLS);
	}

	getClientes() {
		this._clienteService.getClientes().subscribe(
			(result: any) => {
				//console.log(result);
				if (result.length > 0) {
					this.clientes = result;
					//console.log("clientes:", this.clientes);
					//Cargo marcador del mapa
					for (var i = this.clientes.length - 1; i >= 0; i--) {
						this.marcadores[i] = 
							new Marcador(this.clientes[i].nombre1+''+this.clientes[i].nombre2,
										parseFloat(this.clientes[i].direccion.coordLat),
										parseFloat(this.clientes[i].direccion.coordLon),
										false
										);
					}
					//console.log("Marcadores", this.marcadores);
					//this.actualizarMarcador( this.marcadores,
					//						 this.cliente.direccion.coordLat,
					//						 this.cliente.direccion.coordLon, 
					//						 0
					//				   		);
					//this.marcadores[0].lat=this.cliente.direccion.coordLat;
					//this.marcadores[0].lng=this.cliente.direccion.coordLon;
					//this.guardarStorage(this.marcadores);

				} else {
					////console.log("ID:",this.id," Result Controler:",result.status);
				}

			},
			error => {
				////console.log(<any>error);
			}
		)
	}



};	