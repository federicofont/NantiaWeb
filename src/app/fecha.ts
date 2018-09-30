export class Fecha{


		public actualDate: Date = new Date();
		public actualDateStr: string="";

	getDate(){
		/*console.log(this.actualDate.getFullYear());
		console.log(this.actualDate.getMonth());
		console.log(this.actualDate.getDate());
		console.log(this.actualDate.getHours());
		console.log(this.actualDate.getMinutes());
		console.log(this.actualDate.getSeconds());
		console.log(this.actualDate);
		*/
		//yyyy-MM-dd HH:mm:ss
		//this.actualDateStr = this.actualDate.getFullYear()+'-'+;

		var d = new Date();
		d = new Date(d.getTime() - 3000000);
		var date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
		//console.log(date_format_str);

		return date_format_str;
	}

	getDateStr(fecha:Date){

		var d = fecha;
		d = new Date(d.getTime() - 3000000);
		var date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
		//console.log(date_format_str);

		return date_format_str;
	}

	getDateStrStr(fecha:string){
		//yyyy-MM-dd HH:mm:ss
		//1986-01-09
		//console.log("fecha:",fecha);
		var date_format_str =fecha+' 00:00:00' ;
		//console.log("date_format_str:",date_format_str);
		//console.log(date_format_str);

		return date_format_str;
	}



}

