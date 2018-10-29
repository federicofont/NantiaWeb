import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from './vehiculo.model';

@Component({
	selector: 'formVehiculoAdd',
	templateUrl: '../vehiculo/vehiculo-add.html',
	providers: [VehiculoService],
	styleUrls: ['./vehiculo.style.css']
})

export class VehiculoAddComponent {

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

	guardar(vehiculoAdd: NgForm) {
		////console.log(("vehiculo ADD/Update ID:", this.id);
		if (this.id==null) {
		// Add user

		//Creo el vehiculo desde el formulario
		this.vehiculo = vehiculoAdd.value;
		////console.log(("Vehiculo:",this.vehiculo);

		this._vehiculoService.addVehiculo(this.vehiculo)
			.subscribe((result: any) => {
				if (result.id > 0) {
					this._router.navigate(['/vehiculo']);
				} else {
					////console.log(("Result Controler",result.status);
				}
			},
				error => {
					////console.log((<any>error);
				})
		}else{
		// Update user

		//Actualizo el vehiculo desde el formulario
		// this.vehiculo=vehiculoAdd.value;
		// this.vehiculo.id=this.id;
		// ////console.log(("vehiculo:",this.vehiculo);

		 this._vehiculoService.editVehiculo(this.vehiculo)
		 	.subscribe((result : any) => {
		// 	////console.log(("Result Controler",result.status);
		 			if(result.id > 0){
		 				this._router.navigate(['/vehiculo']);
		// 			}else{
		// 				//204 -- No Content
		// 				////console.log(("Result Controler",result.status);
		 		}
		 		},
		 		error => {
		 			////console.log((<any>error);
		 		})
		 }

	}


}