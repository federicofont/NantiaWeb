enum dias {
	  DOMINGO = 0,
	  LUNES =1,
	  MARTES =2,
	  MIERCOLES =3,
	  JUEVES =4,
	  VIERNES =5,
	  SABADO = 6
	}

export class Dias{


	getDias(){
		return dias;
	}

	getDia(dia:number){
		return dias[dia];
	}

}
