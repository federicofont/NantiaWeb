import { Component, OnInit} from '@angular/core';
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
import { ListaPrecio} from '../listaprecios/listaprecio.model';
import { ListaPrecioService } from '../listaprecios/listaprecio.service';

import { Fecha } from '../fecha';

@Component ({
	selector: 'formClienteAdd',
	templateUrl: './cliente-add.html',
	providers: [ClienteService, EnvaseService,ListaPrecioService, Fecha],
	styleUrls: ['./cliente.style.css']
})

export class ClienteAddComponent{
	
	public titulo: string;
	
	id:number;
	marcadores:Marcador[]=[];
	documentos:Documento[]=[];
	
	envase : Envase = new Envase();
	envases : Envase [] = [];
	envaseEnprestamo: EnvaseEnPrestamo = new EnvaseEnPrestamo();
	envasesEnprestamo:EnvaseEnPrestamo[] = [];
	listaPrecio: ListaPrecio = new ListaPrecio();
	listaPrecios : ListaPrecio[]=[];
	semana : boolean[]=[];
	dias : string[]=[];

	  //Posicion de referencia de mapa
	  lat: number =  -34.4549810;
	  lng: number = -56.3999980;
	  zoom:number = 14;

	  documento0 : Documento = new Documento(0,"CI");
	  documento1 : Documento = new Documento(1,"Rut");
	  documento2 : Documento = new Documento(2,"NA");

	  //marcador : Marcador = new Marcador("Nantia",this.lat, this.lng,false);

	/*Creo los objetos que voy a referenciar y editar en el HTML*/
	direccion : Direccion = new Direccion();
	cliente : Cliente = new Cliente();
	
	constructor(private _clienteService: ClienteService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute,
				private _envaseService: EnvaseService,
				private _listaPrecioService:ListaPrecioService,
				private _fecha:Fecha
				){

		this._activatedRoute.params
			.subscribe( parametros=>{
			////console.log("id",parametros.id);
			this.id = parametros['id'];
			})


		if(this.id != null){
			this.titulo = 'Editar Cliente'
		}else{
			this.titulo = 'Nuevo Cliente';	
		} 
		
	}
	 

	ngOnInit(){
		////console.log('cliente-add.component.ts cargado');	
		  this.documentos[0] = this.documento0;
		  this.documentos[1] = this.documento1;
		  this.documentos[2] = this.documento2;
		  ////console.log("Documentos:",this.documentos);

		  this.envasesEnprestamo=[];
		  this.marcadores=[];

		if(this.id != null){
			this.getCliente();
		}

		  
		  this.getEnvases();
		  this.getListaPrecios();
		  this.getSemana();

	}


  marcadorCliqueado(marcador:Marcador,index:number){
  	console.log("Marcador cliqueado: ",marcador);

  }

  agregarMarcador( evento){
	//console.log("agregarMarcador")
  	//limpio el arreglo para que quede solo 1 marcador
  	this.marcadores=[];
    
    const coords:{ lat: number, lng:number}=evento.coords;
    const nuevoMarcador = new Marcador( "Direccion",coords.lat, coords.lng,true);
    //publico
    this.marcadores.push(nuevoMarcador);
    //console.log("agregarMarcador", this.marcadores);

    this.actualizarMarcador(/*actuaMarcador,*/ coords.lat, coords.lng, 0);	
    //guardo cambios
    //this.guardarStorage(this.marcadores);
    ////console.log(evento);
    //////console.log(evento.coords.lat);
  }

  //guardarStorage(marcadoresAux:Marcador[]){
  	//console.log("guardarStorage");
  	//borro el local storage de "marcadores"
  	//localStorage.removeItem('marcadores');
  	//guardo el nuevo item
    //localStorage.setItem('marcadores',JSON.stringify( marcadoresAux ) );
    ////console.log("Marcadores: ", marcadoresAux);
  //}

  //borrarMarcador(i: number){
  	//borro elementos de un arreglo
  //  this.marcadores.splice(i,1);
    //guardo el nuevo localStorage sin el eleento.
    //this.guardarStorage(this.marcadores);
  //}

  posicionFinalMarcador(marcador:any, $event:any, posicion:number){
  	//console.log("Posicion Final:",marcador,$event);

 // 	var actuaMarcador ={
 // 		Nombre: marcador.nombre,
 // 		Lat: parseFloat(marcador.lat) ,
 // 		Long:parseFloat(marcador.lng),
 // 		Movil: true
 // 	}

  	var nuevaLat = $event.coords.lat;
  	var nuevaLong = $event.coords.lng;

    console.log('nuevaLat: ', nuevaLat,"nuevaLong",nuevaLong);

    this.actualizarMarcador(/*actuaMarcador,*/ nuevaLat, nuevaLong, posicion);	
  }


  actualizarMarcador(/*marker_aux,*/nuevaLatAux,nuevaLongAux, posicion){
		//Obtener marcadores
		//console.log("actualizarMarcador")
		//var marcadoresLS =JSON.parse(localStorage.getItem('marcadores'));
		
		//marcadoresLS[posicion].lat = nuevaLatAux;
		//marcadoresLS[posicion].lng = nuevaLongAux;

		this.direccion.coordLat=nuevaLatAux;
		this.direccion.coordLon=nuevaLongAux;

		//this.marcadores[posicion].lat = nuevaLatAux;
		//this.marcadores[posicion].lng = nuevaLongAux;
		console.log("this.direccion",this.direccion);
		//this.guardarStorage(marcadoresLS);
	}

	getCliente(){
	////console.log("entre al getcliente");
	this._clienteService.getCliente(this.id).subscribe(
				result =>{
					////console.log("status:",result.status);
					if(result.status == 200){
						 this.cliente = result.json();
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
						console.log("cliente:",this.cliente.direccion);
						//this.actualizarMarcador( this.marcadores,
						//						 this.cliente.direccion.coordLat,
						//						 this.cliente.direccion.coordLon, 
						//						 0
						//				   		);
						//this.marcadores[0].lat=this.cliente.direccion.coordLat;
						//this.marcadores[0].lng=this.cliente.direccion.coordLon;
						//this.guardarStorage(this.marcadores);

					}else{
						////console.log("ID:",this.id," Result Controler:",result.status);
					}

				},
				error =>{
					////console.log(<any>error);
				}
			)
	}

	guardar(clienteAdd:NgForm){

		//Cargo las cordenadas del mapa en el objeto direccion
		console.log("Guardar",this.cliente);
		//this.direccion.coordLat=this.marcadores[0].lat;
		//this.direccion.coordLon=this.marcadores[0].lng;
		//Asigno el objeto direccion dentro del objeto cliente
		this.cliente.direccion = this.direccion;
		this.cliente.setEnvasesEnPrestamo=this.envasesEnprestamo;
		this.cliente.fechaAlta= this._fecha.getDate();
		//console.log("fechaNacimiento",clienteAdd.value.fechaNacimiento);
		this.cliente.fechaNacimiento=this._fecha.getDateStrStr(clienteAdd.value.fechaNacimiento);
		this.cliente.idLista=this.listaPrecio.id;
		//this.cliente.dias= this.dias;
		//console.log("Cliente",this.cliente)
		
		if(this.id != null){
			//Llamo al servicio que actualiza el cliente
			this.cliente.id=this.id;
			this.updateCliente();
		} 
		else{
			//Llamo al servicio que creara el nuevo cliente
			this.AddCliente();
		}

	}

	getEnvases(){
		this._envaseService.getEnvases().subscribe(
			result =>{
				if(result.status == 200){
					 this.envases = result.json();
					 //console.log(result.json());
				}else{
					console.log("Result Controler",result.status); 
				}
			},
			error =>{
				console.log(<any>error);
			}
		);
	}

	getEnvase(id:number){
			this._envaseService.getEnvase(id).subscribe(
				result =>{
					if(result.status == 200){
						 return result.json();
					}else{
						console.log("ID:",this.id," Result Controler:",result.status);
					}

				},
				error =>{
					console.log(<any>error);
				}
			);
		}


	addEnvaseEnPrestamo(envaseAdd:NgForm){	
		//Cargo el objeto envase y el arreglo envases
		var ind:number=0;
		var idEnvase:number =envaseAdd.controls['id'].value;
		//console.log("this.envases",this.envases);
    	for (var i = this.envases.length - 1; i >= 0; i--) {
			if(this.envases[i].id == idEnvase)
				ind = i;
			//else
			//	console.log("i",i);
		}

		const nuevo_envaseEnprestamo = new EnvaseEnPrestamo( null,
											this.envases[ ind ] ,
														  envaseAdd.controls['cantidad'].value);

		//console.log("nuevo_envaseEnprestamo",nuevo_envaseEnprestamo);
		this.envasesEnprestamo.push(nuevo_envaseEnprestamo);
		//this.getEnvasesEnprestamo();
	}

	getListaPrecios(){
		this._listaPrecioService.getListaPrecios().subscribe(
			result =>{
				if(result.status == 200){
					 this.listaPrecios = result.json();
					 //console.log(result.json());
				}else{
					console.log("Result Controler",result.status); 
				}
			},
			error =>{
				console.log(<any>error);
			}
		);
	}

//	getEnvasesEnprestamo(){
//		this.envasesEnprestamo;
		//console.log(this.envasesEnprestamo);
//	}

	updateCliente(){
		////console.log("update:",this.cliente);
		this._clienteService.editCliente(this.id, this.cliente)
				.subscribe(result => {
				////console.log("Result Controler",result.status);
 					if(result.status=200){
 						this._router.navigate(['/clientes']);
 					}else{
 						//204 -- No Content
 						console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					console.log(<any>error);
 				})
	}


	AddCliente(){
		//console.log("Cliente ADD",this.cliente)
		this._clienteService.addCliente(this.cliente)
			.subscribe(result => {
					if(result.status==201){
						//console.log("Result Controler:",result.status);
						this._router.navigate(['/clientes']);
					}else{
						console.log("Result Controler:",result.status);
				}
				},
				error => {
					console.log(<any>error);
				})
	}

	getSemana(){
		this.semana[0]=false;
		this.semana[1]=false;
		this.semana[2]=false;
		this.semana[3]=false;
		this.semana[4]=false;
		this.semana[5]=false;
		this.semana[6]=false;

	}


};	