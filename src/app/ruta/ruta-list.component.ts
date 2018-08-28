import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RutaService } from './ruta.service';
import { Ruta} from './ruta.model';

@Component({
    selector: 'rutas-list',
    templateUrl: '../ruta/ruta-list.html',
    providers: [RutaService]
})
export class RutaListComponent{
    public titulo: string;
    public ruta:Ruta;
    public rutas: Ruta[];

    public id:number;

    
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _rutaService: RutaService
    ){
        this.titulo = 'Listado de rutas';
        this._activatedRoute.params
            .subscribe( parametros=>{
            this.id = parametros['id'];
            })
    }

    ngOnInit(){

        if (this.id==null) {
            this.getRutas();
        }else{
            this.getRuta(this.id);
        }

    }
    

    getRutas(){
        this._rutaService.getRutas().subscribe(
            result =>{
                if(result.status == 200){
                     this.rutas = result.json();
                     console.log(result.json());
                }else{
                    console.log("Result Controler",result.status); 
                }
            },
            error =>{
                console.log(<any>error);
            }
        );
    }

    getRuta(id){
        this._rutaService.getRuta(id).subscribe(
            result =>{
                if(result.status == 200){
                     this.ruta = result.json();
                     console.log("GetRuta",result.json());
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

    onDeleteRuta(id){
        this._rutaService.deleteRuta(id).subscribe(
            result =>{
                if(result.status == 200){
                    this.getRutas();
                }else{
                    alert("Error al borrar ruta")
                }
            },
            error =>{
                console.log(<any>error);
            }
        );
    }


}