import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VehiculoService } from './vehiculo.service';
import { Vehiculo} from './vehiculo.model';

@Component({
    selector: 'vehiculos-list',
    templateUrl: '../vehiculo/vehiculo-list.html',
    providers: [VehiculoService],
    styleUrls: ['./vehiculo.style.css']
})
export class VehiculoListComponent{
    public titulo: string;
    public vehiculo:Vehiculo;
    public vehiculos: Vehiculo[];

    public id:number;

    
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _vehiculoService: VehiculoService
    ){
        this.titulo = 'Listado de vehiculos';
        this._activatedRoute.params
            .subscribe( parametros=>{
            this.id = parametros['id'];
            })
    }

    ngOnInit(){

        if (this.id==null) {
            this.getVehiculos();
        }else{
            this.getVehiculo(this.id);
        }

    }
    

    getVehiculos(){
        this._vehiculoService.getVehiculos().subscribe(
            result =>{
                if(result.status == 200){
                     this.vehiculos = result.json();
                }else{
                    console.log("Result Controler",result.status); 
                }
            },
            error =>{
                console.log(<any>error);
            }
        );
    }

    getVehiculo(id){
        this._vehiculoService.getVehiculo(id).subscribe(
            result =>{
                if(result.status == 200){
                     this.vehiculo = result.json();
                     console.log("GetVehiculo",result.json());
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

    onDeleteVehiculo(id){
        this._vehiculoService.deleteVehiculo(id).subscribe(
            result =>{
                if(result.status == 200){
                    this.getVehiculos();
                }else{
                    alert("Error al borrar vehiculo")
                }
            },
            error =>{
                console.log(<any>error);
            }
        );
    }


}