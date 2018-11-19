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
    providers: [ClienteService,ListaPrecioService],
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
    dias: boolean[] = [false,false,false,false,false,false,false,];

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
                private _listaPrecioService: ListaPrecioService,
                private _activatedRoute:ActivatedRoute)
        {
        this.titulo = 'Cliente';

        this._activatedRoute.params
            .subscribe( parametros=>{
            this.id = parametros['id'];
            })
        }
    
    ngOnInit(){

        this.getListaPrecios();
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
                    this.cliente.fechaNacimiento= this.cliente.fechaNacimiento.substr(0,10);
                    //console.log("Get envasesEnprestamo",this.envasesEnprestamo);
                    //Cargo marcador del mapa
                    this.marcadores[0] = new Marcador("Nantia",
                        parseFloat(this.cliente.direccion.coordLat),
                        parseFloat(this.cliente.direccion.coordLon),
                        true
                    );
                    ////console.log("marcadores:",this.marcadores);
                    this.cliente.dias.map(dia=>{
                        switch (dia) {
                            case "DOMINGO":
                                this.dias[0]=true;
                                break;
                            case "LUNES":
                                this.dias[1]=true;
                                break;
                            case "MARTES":
                                this.dias[2]=true;
                                break;
                            case "MIERCOLES":
                                this.dias[3]=true;
                                break;
                            case "JUEVES":
                                this.dias[4]=true;
                                break;
                            case "VIERNES":
                                this.dias[5]=true;
                                break;
                            case "SABADO":
                                this.dias[6]=true;
                                break;
                        }

                    })
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

    getListaPrecios() {
        this._listaPrecioService.getListaPrecios().subscribe(
            result => {
                if (result.length > 0) {
                    this.listaPrecios = result;//.json();
                    //console.log(result.json());
                } else {
                    console.log("Result Controler", result.status);
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }


};