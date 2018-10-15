import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VentaService } from './venta.service';
import { Venta} from './venta.model';

@Component({
    selector: 'ventas-list',
    templateUrl: '../venta/ventas-list.html',
    providers: [VentaService],
    styleUrls: ['./venta.style.css']
})
export class VentaListComponent{
    public titulo: string;
    public venta:Venta;
    public ventas: Venta[];

    public id:number;

    
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _ventaService: VentaService
    ){
        this.titulo = 'Listado de ventas';
        this._activatedRoute.params
            .subscribe( parametros=>{
            this.id = parametros['id'];
            })
    }

    ngOnInit(){

        if (this.id==null) {
            this.getVentas();
        }else{
            this.getVenta(this.id);
        }

    }
    

    getVentas(){
        this._ventaService.getVentas().subscribe(
            result =>{
                if(result.status == 200){
                     this.ventas = result.json();
                     console.log("Ventas",this.ventas); 
                }else{
                    console.log("Result Controler",result.status); 
                }
            },
            error =>{
                console.log(<any>error);
            }
        );
    }

    getVenta(id){
        this._ventaService.getVenta(id).subscribe(
            result =>{
                if(result.status == 200){
                     this.venta = result.json();
                }else{
                    console.log("ID:",this.id," Result Controler:",result.status);
                }

            },
            error =>{
                console.log(<any>error);
            }
        );
    }


    public confirmado;

    borrarConfirm(id){
        this.confirmado=id;
    }

    cancelarConfirm(){
        this.confirmado=null;
    }

    onDelete(id){
        this._ventaService.deleteVenta(id).subscribe(
            result =>{
                if(result.status == 200){
                    this.getVentas();
                }else{
                    alert("Error al borrar venta")
                }
            },
            error =>{
                console.log(<any>error);
            }
        );
    }


}