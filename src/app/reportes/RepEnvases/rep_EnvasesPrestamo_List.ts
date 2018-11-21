import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ReporteService } from '../../reportes/reportes.service';
import { Reporte } from '../../reportes/reporte.model';


@Component({
    selector: 'RepEnvases_List',
    templateUrl: './rep_EnvasesPrestamo_List.html',
    providers: [ReporteService],
    styleUrls: ['../reportes.style.css']
})
export class RepEnvases{
    public titulo: string;
    public id:number;
    
    public prestamos;
    public prestamo;
    
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _reporteService: ReporteService
    ){
        this.titulo = 'Clientes con Envases en Préstamo';
        this._activatedRoute.params
            .subscribe( parametros=>{
            this.id = parametros['id'];
            })
    }


ngOnInit(){

		if (this.id==null) {

			this.getEnvasesEnPrestamo();

		}else{

			this.getEnvaseEnPrestamo(this.id);
			
		}

	}


//Stock de Envases a préstamo
    getEnvasesEnPrestamo(){
        this._reporteService.getEnvasesEnPrestamo().subscribe(
            (result : any) =>{
                if (result) {
                    this.prestamos = result;
                     console.log("Envases", this.prestamos); 
                }else{
                    //console.log("Result Controler",result.status); 
                }
            },
            error =>{
                //console.log(<any>error);
            }
        );
    }

    getEnvaseEnPrestamo(id:number){
        this._reporteService.getEnvaseEnPrestamo(id).subscribe(
            (result : any) =>{
                if (result.length > 0) {
                     console.log("getEnvaseEnPrestamo", result); 
                }else{
                    //console.log("Result Controler",result.status); 
                }
            },
            error =>{
                //console.log(<any>error);
            }
        );
    }


}