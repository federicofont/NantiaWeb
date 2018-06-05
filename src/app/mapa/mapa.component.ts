import { Component, OnInit } from '@angular/core';
import { MarkerService } from './mapa.marker.service';
import { RequestService } from './mapa.request.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.style.css'],
  providers: [MarkerService, RequestService]
})
export class MapaComponent  {

  //Posicion Inicial
  Lat: number =  -34.4549810;
  Long: number = -56.3999980;
  zoom:number = 14;
  
  nombreMarcador:string;
  latitudMarcador:string;
  longitudMarcador:string;
  marcadorMovil:string;


  //Marcadores
  markers:marker[];

  constructor(
    private _markerService:MarkerService,
    private _requestService:RequestService) {
   this.markers = this._markerService.obtenerMarcadores();
     }

   marcadorCliqueado(marcador:marker,index:number){
  	console.log("Marcador cliqueado: " + marcador.Nombre);
  }

  mapCliqueado($event:any){
  	console.log("Mapa Cliqueado");

  	var nuevoMarcador ={
  		Nombre: "Sin Titulo",
  		Lat: $event.coords.lat,
  		Long:$event.coords.lng,
  		Movil: true
  	}

  	this.markers.push(nuevoMarcador);
    this._markerService.agregarMarcador(nuevoMarcador);
  }

  posicionFinalMarcador(marcador:any, $event:any){
  	console.log("Posicion Final:",marcador,$event);

  	var actuaMarcador ={
  		Nombre: marcador.Nombre,
  		Lat: parseFloat(marcador.Lat) ,
  		Long:parseFloat(marcador.Long),
  		Movil: true
  	}

  	var nuevaLat = $event.coords.lat;
  	var nuevaLong = $event.coords.lng;

    console.log('nuevaLat: '+ nuevaLat);
  	console.log('nuevaLong: '+ nuevaLong);
    console.log('actuaMarcador: '+ actuaMarcador.Nombre);

    this._markerService.actualizarMarcador(actuaMarcador, nuevaLat, nuevaLong);	
  }

  agregarMarcador(){
    console.log('Agregando Marcador');
    console.log("--------------------- Agregar Marcador -----------------");

    var esMovil = true;
    if (this.marcadorMovil == 'si') {
       var esMovil = true;
    }else{
      var esMovil = false;
    }
    
    console.log(esMovil);
    console.log(this.nombreMarcador);
    console.log(this.latitudMarcador);
    var nuevoMarcador ={
      Nombre:this.nombreMarcador,
      Lat:parseFloat(this.latitudMarcador),
      Long:parseFloat(this.longitudMarcador),
      Movil:esMovil
    }

    this.markers.push(nuevoMarcador);
    this._markerService.agregarMarcador(nuevoMarcador);
   }

    ngOnInit(){
     console.log(this._requestService.getPrueba);
        
     //LISTADO
     // this._requestService.getListado().subscribe(
     //   result => {
     //     this.markers = result;
     //     console.log("Listado: ");
     //     console.log(result);
         
     //     if(!this.markers){
     //       console.log("Error en el servidor");
     //     }

     //   },
     //   error => {
     //     var errorMessage = <any>error;
     //     console.log(errorMessage);
     //   }),
          //PUNTO INICIAL
     this._requestService.getPuntoInicial().subscribe(
       result => {
         
    var nuevoMarcador ={
      Nombre:result.idCliente,
      Lat:result.corLat,
      Long:result.corLan,
      Movil:true
    }

    console.log("Result-----------");
    console.log(nuevoMarcador);
    this.markers.push(nuevoMarcador);
    this._markerService.agregarMarcador(nuevoMarcador);

    this._markerService.obtenerMarcadores();

         //this.inicialMarcador(result.idCliente,result.corLat,result.corLan);
        //  console.log("------------Antes de getpuntoinicial");
        // console.log(this.markers[0].Lat);
        // console.log(this.markers[0].Long);
    
        //  this.markers[0].Lat = result.corLat ;
        //  console.log("----------------------------------------------");
        //  console.log(result.corLat);
        //  console.log(this.Lat);
        //  this.markers[0].Long = result.corLon ;
        //  console.log(result.corLan);
        //  console.log(this.Long);
        //  this.markers[0].Nombre=result.idCliente;
        //  console.log(result.idCliente);
        //  console.log(this.nombreMarcador);

        //  console.log("Punto Inicial :");
        //  console.log(result);

      })

   }


}
//tipo de Marcado
interface marker{
	Nombre?:string;
	Lat:number;
	Long:number;
	Movil:boolean;
}