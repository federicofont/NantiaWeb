import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ReporteService } from './reportes.service';
import { Reporte } from './reporte.model';


@Component({
    selector: 'CuentasXCobrar_List',
    templateUrl: '../reportes/rep_CuentasXCobrar_List.html',
    providers: [ReporteService],
    styleUrls: ['./reportes.style.css']
})
export class RepCuentasXCobrar{
    public titulo: string;
    public id:number;

    public cuentas= null;
    public cuenta=[];


    
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _reporteService: ReporteService
    ){
        this.titulo = 'Cuentas por Cobrar';
        this._activatedRoute.params
            .subscribe( parametros=>{
            this.id = parametros['id'];
            })
    }


ngOnInit(){

		if (this.id==null) {

			this.getCuentasACobrar();

		}else{

			this.getCuentaACobrar(this.id);
			
		}

	}


//Cuentas a Cobrar Por clientes y antigüedad
    getCuentasACobrar(){
        this._reporteService.getCuentasACobrar().subscribe(
            (result : any) =>{
                if (result.length > 0) {
                     console.log("getCuentasACobrar", result); 
                     this.cuentas;
                }else{
                    //console.log("Result Controler",result.status); 
                }
            },
            error =>{
                //console.log(<any>error);
            }
        );
    }

    getCuentaACobrar(id:number){
        this._reporteService.getCuentaACobrar(id).subscribe(
            (result : any) =>{
                if (result.length > 0) {
                     console.log("getCuentaACobrar", result); 
                     this.cuenta;
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