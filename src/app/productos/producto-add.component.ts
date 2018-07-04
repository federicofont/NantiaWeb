import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { ProductoService } from './producto.service';
import { Producto } from './producto.model';
import { Presentacion } from './presentacion.model';


@Component ({
	selector: 'formProductoAdd',
	templateUrl: '../productos/producto-add.html',
	providers: [ProductoService],
	styles: [`
		.ng-invalid.ng-touched:not(form){
		border:1px solid red;
		}`]
})

export class ProductoAddComponent{
	public titulo: string;
	
	producto: Producto = new Producto();
	presentaciones:Presentacion[]=[];

	  presentacion0 : Presentacion = new Presentacion(0,"1 Litro");
	  presentacion1 : Presentacion = new Presentacion(1,"2 Litro");
	  presentacion2 : Presentacion = new Presentacion(2,"3 Litro");
	  presentacion3 : Presentacion = new Presentacion(3,"5 Litro");
	  presentacion4 : Presentacion = new Presentacion(4,"10 Litros");
	  presentacion5 : Presentacion = new Presentacion(5,"12 Litros");
	  presentacion6 : Presentacion = new Presentacion(6,"20 Litros");

	nuevo:boolean=false;
	id:number;

	constructor(private _productoService: ProductoService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute){
		
		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})


		if(this.id != null){
			this.titulo = 'Editar Producto'
		}else{
			this.titulo = 'Nuevo Producto';	
		} 

	}
	 

	ngOnInit(){
		//console.log('producto-add.component.ts cargado');
		this.presentaciones[0] = this.presentacion0;
		this.presentaciones[1] = this.presentacion1;
		this.presentaciones[2] = this.presentacion2;
		this.presentaciones[3] = this.presentacion3;
		this.presentaciones[4] = this.presentacion4;
		this.presentaciones[5] = this.presentacion5;
		this.presentaciones[6] = this.presentacion6;

		if(this.id != null){
			this.getProducto();

		}

	}


	getProducto(){
		this._productoService.getProducto(this.id).subscribe(
			result =>{
				if(result.status == 200){
					//console.log("Result:",result.json());
					 this.producto = result.json();
				}else{
					console.log("ID:",this.id," Result Controler:",result.status);
				}

			},
			error =>{
				console.log(<any>error);
			}
		)

	}

	guardar(productoAdd:NgForm){
		//Creo el producto desde el formulario
		this.producto=productoAdd.value;
		console.log("Producto:",this.producto);
		
		if(this.id != null){
			//Llamo al servicio que actualiza el cliente
			this.producto.productoId=this.id;
			this.updateProducto();
		} 
		else{
			//Llamo al servicio que creara el nuevo cliente
			this.AddProducto();
		}

	}


	updateProducto(){
		console.log("update:",this.producto);
		this._productoService.editProducto(this.id, this.producto)
				.subscribe(result => {
				////console.log("Result Controler",result.status);
 					if(result.status=200){
 						this._router.navigate(['/productos']);
 					}else{
 						//204 -- No Content
 						console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					console.log(<any>error);
 				})
	}

	AddProducto(){
		this._productoService.addProducto(this.producto).subscribe(
			result => {
				if(result.status==201){
					this._router.navigate(['/productos/'+result.json().productoId]);
						console.log("Result Controler",result.status);
				}else{
						console.log("Result Controler",result.status);
				}
			},
			error => {
				console.log(<any>error);
				}
		)
	}

 		
}