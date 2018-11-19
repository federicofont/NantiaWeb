import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RepartoService } from './reparto.service';
import { Reparto} from './reparto.model';

@Component({
    selector: 'repartos-list',
    templateUrl: '../reparto/reparto-list.html',
    providers: [RepartoService],
    styleUrls: ['./reparto.style.css']
})
export class RepartoListComponent{
    public titulo: string;
    public reparto:Reparto;
    public repartos: Reparto[];

    public id:number;

    
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _repartoService: RepartoService
    ){
        this.titulo = 'Listado de repartos';
        this._activatedRoute.params
            .subscribe( parametros=>{
            this.id = parametros['id'];
            })
    }

    ngOnInit(){

        if (this.id==null) {
            this.getRepartos();
        }else{
            this.getReparto(this.id);
        }

    }
    

    getRepartos(){
        this._repartoService.getRepartos().subscribe(
            (result : any) =>{
                if (result.length > 0) {
                     this.repartos = result;
                     //console.logresult.json());
                    // console.log(this.repartos);
                }else{
                    //console.log("Result Controler",result.status); 
                }
            },
            error =>{
                //console.log(<any>error);
            }
        );
    }

    getReparto(id){
        this._repartoService.getReparto(id).subscribe(
            (result : any) =>{
                if (result.id > 0) {
                     this.reparto = result;
                     //console.log("GetReparto",result.json());
                }else{
                    //console.log("ID:",this.id," Result Controler:",result.status);
                }

            },
            error =>{
                //console.log(<any>error);
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
        this._repartoService.deleteReparto(id).subscribe(
            (result:any) =>{
                if(result==null){
                    this.getRepartos();
                }else{
                    alert("Error al borrar reparto")
                }
            },
            error =>{
                //console.log(<any>error);
            }
        );
    }


}