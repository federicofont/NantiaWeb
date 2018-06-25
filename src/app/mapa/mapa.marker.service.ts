import{Injectable} from '@angular/core';
import{Init} from './mapa.init-markers';

@Injectable()
export class MarkerService extends Init{
	constructor(){
		super();
		//console.log('Servicio de marcador iniciado...');
		this.load();
	}

	obtenerMarcadores(){
		var markers = JSON.parse(localStorage.getItem('markers'));
		return markers;
	}

	agregarMarcador(nuevoMarcador){
		    //console.log("--------------------- Agregar Marcador -----------------");
		    //console.log(nuevoMarcador);
		//mostrar marcadores
		var markers =JSON.parse(localStorage.getItem('markers'));

		//agregar el arreglo
		markers.push(nuevoMarcador);
		//configurar en el local storage
		localStorage.setItem('markers',JSON.stringify(markers));
	}

	actualizarMarcador(marker_aux,nuevaLatAux,nuevaLongAux){
		//Obtener marcadores
		var markers =JSON.parse(localStorage.getItem('markers'));
		
		for(var i=0; i<markers.lenght; i++){
			//console.log(marker_aux.Lat); //console.log(markers[i].Lat);
			//console.log(marker_aux.Long); //console.log(markers[i].Long);
			if(marker_aux.Lat == markers[i].Lat && marker_aux.Long == markers[i].Long){	
				markers[i].Lat=nuevaLatAux;
				markers[i].Long=nuevaLongAux;
			}
		}
		//configurar en el local storage
		localStorage.setItem('markers',JSON.stringify(markers));	
	}
}