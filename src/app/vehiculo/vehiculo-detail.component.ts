import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from './vehiculo.model';

import { RepartoService } from '../reparto/reparto.service';
import { Reparto } from '../reparto/reparto.model';

@Component({
	selector: 'formVehiculoDetail',
	templateUrl: '../vehiculo/vehiculo-detail.html',
	providers: [VehiculoService, RepartoService],
	styleUrls: ['./vehiculo.style.css']
})

export class VehiculoDetailComponent {

	public titulo: string;
	public fechaActual: Date = new Date();

	vehiculo: Vehiculo = new Vehiculo();
	reparto: Reparto = new Reparto();
	repartos: Reparto[] = [];

	nuevo: boolean = false;
	id: number;

	constructor(private _vehiculoService: VehiculoService,
				private _repartoService: RepartoService,
				private _router: Router,
				private _activatedRoute: ActivatedRoute
	) {

		this._activatedRoute.params
			.subscribe(parametros => {
				////console.log(("id",parametros.id);
				this.id = parametros['id'];
			})


		if (this.id != null) {
			this.titulo = 'Editar Vehiculo'
		} else {
			this.titulo = 'Nuevo Vehiculo';
		}

	}


	ngOnInit() {
		if (this.id != null) {
			//this.getRepartos();
			this.getVehiculo(this.id);
			
		} else {
			//console.log("vehiculo:", this.vehiculo);
		}
	}


	getRepartos() {
		this._repartoService.getRepartos().subscribe(
			(result: any) => {
				if (result) {
					this.repartos = result;
					//console.log(this.repartos);
					this.getVehiculo(this.id);
					//console.log("Result stock:",this.vehiculo);
					//console.log("result.json():",result.json());

				} else {
					//console.log("ID:",id," Result Controler:",result.status);
				}

			},
			error => {
				//console.logerror);
			}
		)
	}

	getVehiculo(id: number) {
		this._vehiculoService.getVehiculo(id).subscribe(
			(result: any) => {
				if (result.id > 0) {
					this.vehiculo = result;
					//console.log("Result stock:",this.vehiculo);
					//console.log("result.json():",result.json());
					for (var i = this.repartos.length - 1; i >= 0; i--) {
						if (this.repartos[i].vehiculo.id == this.id && this.repartos[i].estado =='INICIADO')
							this.reparto= this.repartos[i];
						console.log (this.reparto);
					}

				} else {
					//console.log("ID:",id," Result Controler:",result.status);
				}

			},
			error => {
				//console.logerror);
			}
		)
	}


	getReparto(idReparto: number) {
		this._repartoService.getReparto(idReparto).subscribe(
			(result: any) => {
				if (result.id > 0) {
					this.reparto = result;
					//console.log("Result stock:",this.vehiculo);
					//console.log("result.json():",result.json());

				} else {
					//console.log("ID:",id," Result Controler:",result.status);
				}

			},
			error => {
				//console.logerror);
			}
		)
	}


}