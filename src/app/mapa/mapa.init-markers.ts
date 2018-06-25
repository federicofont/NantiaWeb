export class Init{
	load(){
		if(localStorage.getItem('markers')==null || localStorage.getItem('markers')==undefined){
			//console.log('No se ecnontraron marcadores...');

			var markers=[
	  		 {
	  		 /* Nombre: "Grido",
	  		  Lat: -34.4519628,
	  		  Long:-56.3967916,
	  		  Movil: true
	  		  },
	  		  {
	  		  Nombre: "Petrobras",
	  		  Lat: -34.4570112,
	  		  Long:-56.3924791,
	  		  Movil: true
  			  },
  			  {
	  		  Nombre: "Hotel Lamas",
	  		  Lat: -34.4560911,
	  		  Long:-56.4003755,
	  		  Movil: true*/
  			  }

			];

			localStorage.setItem('markers',JSON.stringify(markers));
		}else{
			//console.log('Cargando Marcadores...');
		}
	}
}