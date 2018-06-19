import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.model';
import { Direccion } from './direccion.model';
import { Marcador } from '../models/marcador.model';
import { Documento } from './documento.model';

//import { MarkerService } from '../mapa/mapa.marker.service';

@Component ({
	selector: 'formClienteAdd',
	templateUrl: './cliente-add.html',
	providers: [ClienteService],
	styleUrls: ['./mapa.style.css']
//	styles: [`
//		.ng-invalid.ng-touched:not(form){
//		border:1px solid red;
//		}`]
})

export class ClienteAddComponent{
	
	public titulo: string;
	nuevo:boolean=false;
	id:number;
	marcadores:Marcador[]=[];
	documentos:Documento[]=[];

	  //Posicion Inicial
	  lat: number =  -34.4549810;
	  lng: number = -56.3999980;
	  zoom:number = 14;

	  documento1 : Documento = new Documento(1,"Cedula");
	  documento2 : Documento = new Documento(2,"Rut");

	  marcador : Marcador = new Marcador("Nantia",this.lat, this.lng,false);
		
	/*Creo los objetos que voy a referenciar y editar en el HTML*/
	direccion : Direccion = new Direccion();
	cliente : Cliente = new Cliente();
	
	constructor(private _clienteService: ClienteService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute
				){

		this._activatedRoute.params
			.subscribe( parametros=>{
			console.log("id",parametros.id);
			this.id = parametros['id'];
			})


		if(this.id != null){
			this.titulo = 'Editar Cliente'
		}else{
			this.titulo = 'Nuevo Cliente';	
		} 
		
		//Cargo el local storage
		//if ( localStorage.getItem('marcadores') ) {
      		//El localStorage solo recive strings, por eso hago JSON.parse
      	//	this.marcadores = JSON.parse(localStorage.getItem('marcadores') ); 
    	//}

	}
	 

	ngOnInit(){
		console.log('cliente-add.component.ts cargado');	
		if(this.id != null){
			this.getCliente();
		}


	  this.documentos[0] = this.documento1;
	  this.documentos[1] = this.documento2;
	  console.log("Documentos:",this.documentos);
	}


  marcadorCliqueado(marcador:Marcador,index:number){
  	console.log("Marcador cliqueado: ",marcador);

  }

  agregarMarcador( evento){

  	//limpio el arreglo para que quede solo 1 marcador
  	this.marcadores=[];
    
    const coords:{ lat: number, lng:number}=evento.coords;
    const nuevoMarcador = new Marcador( "Direccion",coords.lat, coords.lng,true);
    //publico
    this.marcadores.push(nuevoMarcador);
    //guardo cambios
    this.guardarStorage(this.marcadores);
    console.log(evento);
    //console.log(evento.coords.lat);
  }

  guardarStorage(marcadoresAux:Marcador[]){

  	//borro el local storage de "marcadores"
  	localStorage.removeItem('marcadores');
  	//guardo el nuevo item
    localStorage.setItem('marcadores',JSON.stringify( marcadoresAux ) );
    console.log("Marcadores: ", marcadoresAux);
  }

  borrarMarcador(i: number){
  	//borro elementos de un arreglo
    this.marcadores.splice(i,1);
    //guardo el nuevo localStorage sin el eleento.
    this.guardarStorage(this.marcadores);
  }

  posicionFinalMarcador(marcador:any, $event:any, posicion:number){
  	console.log("Posicion Final:",marcador,$event);

  	var actuaMarcador ={
  		Nombre: marcador.nombre,
  		Lat: parseFloat(marcador.lat) ,
  		Long:parseFloat(marcador.lng),
  		Movil: true
  	}

  	var nuevaLat = $event.coords.lat;
  	var nuevaLong = $event.coords.lng;

    console.log('actuaMarcador: ', actuaMarcador);

    this.actualizarMarcador(actuaMarcador, nuevaLat, nuevaLong, posicion);	
  }


  actualizarMarcador(marker_aux,nuevaLatAux,nuevaLongAux, posicion){
		//Obtener marcadores
		var marcadoresLS =JSON.parse(localStorage.getItem('marcadores'));
		
		marcadoresLS[posicion].lat = nuevaLatAux;
		marcadoresLS[posicion].lng = nuevaLongAux;
		this.cliente.direccion.coordLat=nuevaLatAux;
		this.cliente.direccion.coordLon=nuevaLongAux;


		// for(var i=0; i<markers.lenght; i++){
		//	console.log(marker_aux.Lat); console.log(markers[i].Lat);
		//	console.log(marker_aux.Long); console.log(markers[i].Long);
		//	if(marker_aux.Lat == markers[i].Lat && marker_aux.Long == markers[i].Long){	
		//		markers[i].Lat=nuevaLatAux;
		//		markers[i].Long=nuevaLongAux;
		//	}
		//}
		//configurar en el local storage
		//localStorage.setItem('marcadores',JSON.stringify(marcadoresLS));	
		this.guardarStorage(marcadoresLS);
	}

 //    mapCliqueado($event:any){
  	
 //  		console.log("Mapa Cliqueado");
 //  		this.coord.nombre = "Direccion";
 //  		this.coord.lat = $event.coords.lat;
 //  		this.coord.lng = $event.coords.lng;
 //  		this.coord.movil = true;

 //  		console.log("Coord: ",this.coord);

 //  		//this.coords.push(this.coord);
 //    	this.agregarMarcador(this.coord);
 //  	}

 //  	agregarMarcador(nuevoMarcador:Coord){
	// 	    console.log("--------------------- Agregar Marcador -----------------");
	// 	    console.log(nuevoMarcador);
		
	// 	//mostrar marcadores
	// 	var coords =JSON.parse(localStorage.getItem('coords'));

	// 	//agregar el arreglo
	// 	coords.push(nuevoMarcador);
	// 	//configurar en el local storage
	// 	localStorage.setItem('markers',JSON.stringify(coords));

	// }

	getCliente(){
	console.log("entre al getcliente");
	this._clienteService.getCliente(this.id).subscribe(
				result =>{
					console.log("status:",result.status);
					if(result.status == 200){
						 this.cliente = result.json();
						 this.direccion = this.cliente.direccion;
						 
						//Cargo marcador del mapa
						this.marcadores[0] = new Marcador("Nantia",
														  this.cliente.direccion.coordLat, 
														  this.cliente.direccion.coordLon,
														  true
														  );
						console.log("marcadores:",this.marcadores);
						console.log("cliente:",this.cliente);
						this.actualizarMarcador( this.marcadores,
												 this.cliente.direccion.coordLat,
												 this.cliente.direccion.coordLon, 
												 0
										   		);
						//this.marcadores[0].lat=this.cliente.direccion.coordLat;
						//this.marcadores[0].lng=this.cliente.direccion.coordLon;
						//this.guardarStorage(this.marcadores);

					}else{
						console.log("ID:",this.id," Result Controler:",result.status);
					}

				},
				error =>{
					console.log(<any>error);
				}
			)
	}

	guardar(clienteAdd:NgForm){

		if(this.id != null){
			this.updateCliente();
		} 
		else{
		console.log("cliente ADD/Update ID:", this.id);
		//if (this.id==null) {
			// Add user
		
			//Creo el cliente desde el formulario
			//this.cliente=clienteAdd.value;
			this.direccion.coordLat=this.marcadores[0].lat;
			this.direccion.coordLon=this.marcadores[0].lng;
			console.log("Direccion Mapa: ",this.direccion);
			//Asigno el objeto direccion dentro del objeto cliente
			this.cliente.direccion = this.direccion;
			console.log(this.cliente);
			
			//Llamo al servicio que creara el nuevo cliente
			this._clienteService.addCliente(this.cliente)
				.subscribe(result => {
 					if(result.status==201){
 						console.log("Result Controler",result.status);
 						//this._router.navigate(['/clientes/'+result.json().id]);
 					}else{
 						console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					console.log(<any>error);
 				})
 		//}else{
 			// Update user
			
			//Actualizo el cliente desde el formulario
			// this.cliente=clienteAdd.value;
			// this.cliente.id=this.id;
			// console.log("cliente:",this.cliente);
		
			// this._clienteService.updateCliente(this.cliente)
			// 	.subscribe(result => {
			// 	console.log("Result Controler",result.status);
 		// 			if(result.status==200){
 		// 				this._router.navigate(['/clientes/'+result.json().id]);
 		// 			}else{
 		// 				//204 -- No Content
 		// 				console.log("Result Controler",result.status);
			// 		}
 		// 		},
 		// 		error => {
 		// 			console.log(<any>error);
 		// 		})
 		// }
 		}

	}

	updateCliente(){
		console.log("update:",this.cliente);
		this._clienteService.editCliente(this.id, this.cliente)
				.subscribe(result => {
				console.log("Result Controler",result.status);
 					if(result.status=200){
 						this._router.navigate(['/clientes/'+result.json().id]);
 					}else{
 						//204 -- No Content
 						console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					console.log(<any>error);
 				})
	};

}