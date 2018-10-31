import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.model';
import { Direccion } from './direccion.model';
import { Marcador } from './marcador.model';
import { Documento } from './documento.model';

import { EnvaseEnPrestamo } from './envaseEnprestamo.model';
import { Envase } from '../envases/envase.model';
import { EnvaseService } from '../envases/envase.service';
import { ListaPrecio } from '../listaprecios/listaprecio.model';
import { ListaPrecioService } from '../listaprecios/listaprecio.service';

import { Fecha } from '../fecha';

@Component ({
    selector: 'cliente-detail',
    templateUrl: './cliente-detail.html',
    providers: [ClienteService],
    styleUrls: ['./cliente.style.css']
})

export class ClienteDetailComponent{

    public titulo: string;
    id: number;
    marcadores: Marcador[] = [];
    documentos: Documento[] = [];

    envase: Envase = new Envase();
    envases: Envase[] = [];
    envaseEnprestamo: EnvaseEnPrestamo = new EnvaseEnPrestamo();
    envasesEnprestamo: EnvaseEnPrestamo[] = [];
    listaPrecio: ListaPrecio = new ListaPrecio();
    listaPrecios: ListaPrecio[] = [];
    semana: boolean[] = [];
    dias: string[] = [];

    //Posicion de referencia de mapa
    lat: number = -34.4549810;
    lng: number = -56.3999980;
    zoom: number = 14;

    documento0: Documento = new Documento(0, "CI");
    documento1: Documento = new Documento(1, "Rut");
    documento2: Documento = new Documento(2, "NA");

    //marcador : Marcador = new Marcador("Nantia",this.lat, this.lng,false);

    /*Creo los objetos que voy a referenciar y editar en el HTML*/
    direccion: Direccion = new Direccion();
    cliente: Cliente = new Cliente();


    constructor(private _clienteService: ClienteService,
                private _router:Router,
                private _activatedRoute:ActivatedRoute)
        {
        this.titulo = 'Cliente';

        this._activatedRoute.params
            .subscribe( parametros=>{
            this.id = parametros['id'];
            })
        }
    
    ngOnInit(){

        this.getCliente(this.id);

    }

      getCliente(id: number) {
        ////console.log("entre al getcliente");
        this._clienteService.getCliente(id).subscribe(
            (result: Cliente) => {
                ////console.log("status:",result.status);
                //this.cliente = result;
                if (result.id) {
                    this.cliente = result;//.json();
                    //console.log("cliente:",this.cliente);
                    this.direccion = this.cliente.direccion;
                    this.envasesEnprestamo = this.cliente.setEnvasesEnPrestamo;
                    //console.log("Get envasesEnprestamo",this.envasesEnprestamo);
                    //Cargo marcador del mapa
                    this.marcadores[0] = new Marcador("Nantia",
                        parseFloat(this.cliente.direccion.coordLat),
                        parseFloat(this.cliente.direccion.coordLon),
                        true
                    );
                    ////console.log("marcadores:",this.marcadores);
                    console.log("cliente:", this.cliente);
                    //this.actualizarMarcador( this.marcadores,
                    //                         this.cliente.direccion.coordLat,
                    //                         this.cliente.direccion.coordLon, 
                    //                         0
                    //                           );
                    //this.marcadores[0].lat=this.cliente.direccion.coordLat;
                    //this.marcadores[0].lng=this.cliente.direccion.coordLon;
                    //this.guardarStorage(this.marcadores);

                } else {
                    ////console.log("ID:",this.id," Result Controler:",result.status);
                }

            },
            error => {
                ////console.log(<any>error);
            }
        )
    }


};