import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from './vehiculo.model';

@Component({
	selector: 'formVehiculoDetail',
	templateUrl: '../vehiculo/vehiculo-detail.html',
	providers: [VehiculoService],
	styleUrls: ['./vehiculo.style.css']
})

export class VehiculoDetailComponent {

	public titulo: string;
	public fechaActual: Date = new Date();

	vehiculo = new Vehiculo();

	nuevo: boolean = false;
	id: number;

	constructor(private _vehiculoService: VehiculoService,
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
			this.getVehiculo(this.id);
		} else {
			//console.log("vehiculo:", this.vehiculo);
		}
	}


	getVehiculo(id: number) {
		this._vehiculoService.getVehiculo(id).subscribe(
			(result: any) => {
				if (result.id > 0) {
					this.vehiculo = result;
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