import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ClienteService } from '../clientes/cliente.service';
import { Cliente } from '../clientes/cliente.model';
import { Direccion } from '../clientes/direccion.model';
import { Marcador } from './marcador.model';

import { VehiculoService } from '../vehiculo/vehiculo.service';
import { Vehiculo } from '../vehiculo/vehiculo.model';
//import { VehiculoUbicacion } from './vehiculoUbicacion.model';

@Component({
	selector: 'formMapaCli',
	templateUrl: './mapaCli.html',
	providers: [ClienteService,VehiculoService],
	styleUrls: ['./mapa.style.css']
})

export class MapaCliComponent {

	public titulo: string;

	id: number;
	marcadores: Marcador[] = [];


	//Posicion de referencia de mapa
	lat: number = -34.4549810;
	lng: number = -56.389000;//3999990;
	zoom: number = 15;

	icoCliente:string = 'assets/bootstrap/image/ico/house-24_B.ico';
	icoCamion:string ='assets/bootstrap/image/ico/truck-24_R.ico';
	icoFabrica:string ='assets/bootstrap/image/ico/factory-24_G.ico';

	//marcador : Marcador = new Marcador("Nantia",this.lat, this.lng,false);

	/*Creo los objetos que voy a referenciar y editar en el HTML*/
	direccion: Direccion = new Direccion();
	cliente: Cliente = new Cliente();
	clientes: Cliente[] = [];

	vehiculo: Vehiculo = new Vehiculo();
	vehiculos: Vehiculo[] = [];
//	vehiculoUbicacion: VehiculoUbicacion = new VehiculoUbicacion();
//	vehiculosUbicacion: VehiculoUbicacion[]=[];

	constructor(private _clienteService: ClienteService,
				private _vehiculoService: VehiculoService,
				private _router: Router,
				private _activatedRoute: ActivatedRoute
	) {

		this.titulo = 'Mapa';

	}


	ngOnInit() {

		this.marcadores = [];
		this.marcadores[0] =
			new Marcador('Soda Nantia',
					 parseFloat('-34.455795'), 
					 parseFloat('-56.386793'),
					 false, this.icoFabrica
					);
		this.getClientes();
		//this.getVehiculos();
		//this.getVehiculosUbicacion();
		//this.getMarcadores();
/*
		var promises = [
			this.getClientes(),
		  	this.getVehiculosUbicacion()
		];

		Promise.all(promises).then(results => {
			this.getMarcadores();
		})
*/

	}


	marcadorCliqueado(marcador: Marcador, index: number) {
		console.log("Marcador cliqueado: ", marcador);

	}


	borrarMarcador(i: number) {
		//borro elementos de un arreglo
		this.marcadores.splice(i, 1);
		//guardo el nuevo localStorage sin el eleento.
		// this.guardarStorage(this.marcadores);
	}


	getClientes():any {
		this._clienteService.getClientes().subscribe(
			(result: any) => {
				if (result.length > 0) {
					this.clientes = result;
					//console.log("Clientes",this.clientes);
					this.getVehiculos();
					//this.getMarcadores();
				} else {
					////console.log("ID:",this.id," Result Controler:",result.status);
				}

			},
			error => {
				console.log(<any>error);
			}
		);

	}

	getVehiculos() {
		this._vehiculoService.getVehiculos().subscribe(
			(result: any) => {
				if (result.length > 0) {
					this.vehiculos = result;
					console.log("vehiculos:", this.vehiculos);
					this.getMarcadores();
				} else {
					////console.log("ID:",this.id," Result Controler:",result.status);
				}

			},
			error => {
				console.log(<any>error);
			}
		);
	
	}

/*	getVehiculosUbicacion() {
		this._vehiculoService.getVehiculosUbicacion().subscribe(
			(result: any) => {
				if (result.length > 0) {
					this.vehiculosUbicacion = result;
					//console.log("vehiculosUbicacion:", this.vehiculosUbicacion);
					this.getMarcadores();
				} else {
					////console.log("ID:",this.id," Result Controler:",result.status);
				}

			},
			error => {
				console.log(<any>error);
			}
		);
	
	}
*/

	getMarcadores() {
		//console.log("Marcadores length",largo);

		if(this.clientes.length > 0){
			for (var i = this.clientes.length -1; i >= 0; i--) {
				if(this.clientes[i].direccion.coordLat!=null){
					this.marcadores[i+1] = 
						new Marcador(this.clientes[i].nombre1+''+this.clientes[i].nombre2,
									parseFloat(this.clientes[i].direccion.coordLat),
									parseFloat(this.clientes[i].direccion.coordLon),
									false, this.icoCliente
									);
				}
			}
		}

		if(this.vehiculos.length > 0){
			var largo = this.marcadores.length;
			//console.log("Marcadores length",largo);
			//console.log("MArcadores Autos:",this.marcadores);

			for (var x = this.vehiculos.length -1; x >= 0; x--) {
				if(this.vehiculos[x].coordLat!=null){
					this.marcadores[x + largo] = 
						new Marcador(this.vehiculos[x].descripcion,
									parseFloat(this.vehiculos[x].coordLat),
									parseFloat(this.vehiculos[x].coordLon),
									false, this.icoCamion
									);
				}
				//	console.log(x + largo)
			}
		
/*		if(this.vehiculosUbicacion.length > 0){
			var largo = this.marcadores.length;
			//console.log("Marcadores length",largo);
			//console.log("MArcadores Autos:",this.marcadores);

			for (var x = this.vehiculosUbicacion.length - 1; x >= 0; x--) {
				this.marcadores[x + largo] = 
					new Marcador(this.vehiculosUbicacion[x].vehiculo.matricula,
								parseFloat(this.vehiculosUbicacion[x].coordLat),
								parseFloat(this.vehiculosUbicacion[x].coordLon),
								false, this.icoCamion
								);
				//	console.log(x + largo)
			}
*/
		this.marcadores[this.marcadores.length] =
			new Marcador('Soda Nantia',
					 parseFloat('-34.455795'), 
					 parseFloat('-56.386793'),
					 false, this.icoFabrica
					);
			//console.log("MArcadores Autos+coches:",this.marcadores);		
		}

	}



};	