import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReporteService } from './reportes.service';

@Component({
    selector: 'reportes-list',
    templateUrl: '../reportes/reportes-list.html',
    providers: [ReporteService],
    styleUrls: ['./reportes.style.css']
})
export class ReportesListComponent{
    public titulo: string;
    public id:number;

    
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _reporteService: ReporteService
    ){
        this.titulo = 'Listado de ventas';
        this._activatedRoute.params
            .subscribe( parametros=>{
            this.id = parametros['id'];
            })
    }

    ngOnInit(){

        if (this.id==null) {
           // this.getVentasPeriodo();
           // this.getVentaPeriodo('2018-11-01','2018-11-20');
            this.getCuentasACobrar();
            this.getCuentaACobrar(56);
            this.getEnvasesEnPrestamo();
            this.getEnvaseEnPrestamo(108);
        }else{

        }

    }

    

//ventas por periodo y o cliente
    getVentasPeriodo(){
        this._reporteService.getVentasPeriodo().subscribe(
            (result : any) =>{
                if (result.length > 0) {
                     console.log("getVentasPeriodo", result); 
                }else{
                    //console.log("Result Controler",result.status); 
                }
            },
            error =>{
                //console.log(<any>error);
            }
        );
    }

    getVentaPeriodo(desde:string, hasta:string){
        this._reporteService.getVentaPeriodo(desde, hasta).subscribe(
            (result : any) =>{
                if (result.length > 0) {
                     console.log("getVentaPeriodo", result); 
                }else{
                    //console.log("Result Controler",result.status); 
                }
            },
            error =>{
                //console.log(<any>error);
            }
        );
    }

//Cuentas a Cobrar Por clientes y antigüedad
    getCuentasACobrar(){
        this._reporteService.getCuentasACobrar().subscribe(
            (result : any) =>{
                if (result.length > 0) {
                     console.log("getCuentasACobrar", result); 
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
                }else{
                    //console.log("Result Controler",result.status); 
                }
            },
            error =>{
                //console.log(<any>error);
            }
        );
    }

//Stock de Envases a préstamo
    getEnvasesEnPrestamo(){
        this._reporteService.getEnvasesEnPrestamo().subscribe(
            (result : any) =>{
                if (result.length > 0) {
                     console.log("getEnvasesEnPrestamo", result); 
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