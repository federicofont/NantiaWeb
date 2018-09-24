import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { VentaService } from './venta.service';
import { Venta } from './venta.model';

import { Usuario } from '../usuarios/usuario.model';
import { UsuarioService } from '../usuarios/usuario.service';
import { Cliente } from '../clientes/cliente.model';
import { ClienteService } from '../clientes/cliente.service';
import { ProductoVenta } from './productoVenta.model';

import { Fabrica } from '../fabrica/fabrica.model';
import { FabricaService } from '../fabrica/fabrica.service';

import { ListaPrecio } from '../listaprecios/listaprecio.model';
import { ProductoLista } from '../listaprecios/productolista.model';
import { Producto } from '../productos/producto.model';
import { ListaPrecioService } from '../listaprecios/listaprecio.service';


@Component ({
	selector: 'formVentaAdd',
	templateUrl: '../venta/venta-add.html',
	providers: [VentaService, ListaPrecioService, ClienteService, UsuarioService, FabricaService],
	styleUrls: ['./venta.style.css']
})

export class VentaAddComponent{
	public titulo: string;

	usuario: Usuario = new Usuario();
	cliente: Cliente = new Cliente();
	fabrica: Fabrica = new Fabrica();
	clientes: Cliente[] =[];
	producto:Producto = new Producto();
	listaPrecio: ListaPrecio = new ListaPrecio();
	productoLista: ProductoLista = new ProductoLista();
	setProductoLista:ProductoLista[] = [];
	productoVenta: ProductoVenta = new ProductoVenta();
	setProductoVenta: ProductoVenta[] = [];

	montoDescuento: number=0;
	porcentDescuento = 0;
	
	ivaVariable: number=0;
	iva0 : number = 22;
	iva1 : number = 10;
	formIVA_Variable:number=this.iva0;
	

	venta: Venta = new Venta();
	//nuevo:boolean=false;
	id:number;
	
	/*	public fecha:Date = null,
		public usuario:Usuario = new Usuario(),
		cliente:Cliente = new Cliente(),
		setProductoVenta:ProductoVenta[] = [],
		descuento:number = 0,
		totalVenta:number = 0,
		ivaTotal:number = 0,
		pagoTotal:number = 0,
		fabricaid:number = null,
		repartoir:number = null
	*/


	constructor(private _ventaService: VentaService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute,
				private _listaprecioService:ListaPrecioService,
				private _clienteService:ClienteService,
				private _usuarioService:UsuarioService,
				private _fabricaService:FabricaService
				){
		
		this.titulo = 'Nuevo Venta';

		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}
	 

	ngOnInit(){
		this.getClientes();
		this.getListaPrecio();
		this.getUsuario();
		this.getFabricaDeUsuario(45 /*this.usuario.fabrica.id*/)

	}


	getClientes(){
		this._clienteService.getClientes().subscribe(
			result =>{
				if(result.status == 200){
					 this.clientes = result.json();
				}else{
					console.log("Result Controler",result.status); 
				}
			},
			error =>{
				console.log(<any>error);
			}
		);
	}

	getCliente(formCliente:number){
		this._clienteService.getCliente(formCliente).subscribe(
			result =>{
				if(result.status == 200){
					 this.venta.cliente = result.json();
				}else{
					console.log("Result Controler",result.status); 
				}
			},
			error =>{
				console.log(<any>error);
			}
		);
	}

	getListaPrecio(){
	this._listaprecioService.getListaPrecio(170/*this.id*/).subscribe(
				result =>{
					if(result.status == 200){
						 this.listaPrecio = result.json();
					}else{
						console.log("ID:",this.id," Result Controler:",result.status);
					}

				},
				error =>{
					console.log(error);
				}
			)
	}

	getUsuario(){
		this._usuarioService.getUsuario(10/*this.id*/).subscribe(
			result =>{
				if(result.status == 200){
					 this.venta.usuario = result.json();
				}else{
					console.log("ID:",this.id," Result Controler:",result.status);
				}

			},
			error =>{
				console.log(error);
			}
		)
	}

	getFabricaDeUsuario(idFabrica:number){
		this._fabricaService.getFabrica(idFabrica).subscribe(
			result =>{
				if(result.status == 200){
					 this.fabrica = result.json();
					 this.venta.fabricaid=this.fabrica.id;
				}else{
					console.log("ID:",this.id," Result Controler:",result.status);
				}

			},
			error =>{
				console.log(error);
			}
		)
	}

	addProductoVenta(formproductosAdd:NgForm, formDescuento:number, formIVA_Variable:number, formCliente:number){	
		//console.log(formproductosAdd.value);
		//console.log("listaPrecio.",this.listaPrecio);

		//Cargo el objeto envase y el arreglo envases
		//console.log("formproductosAdd.value.formCliente",formCliente);
		this.getCliente(formCliente);

		//this.venta.fecha = new Date();
		 //yyyy-MM-dd HH:mm:ss
		var ind:number=0;
		//var idProducto:number = formproductosAdd.controls['productoId'].value;
		//console.log("this.envases",this.envases); */
    	for (var i = this.listaPrecio.setProductoLista.length - 1; i >= 0; i--) {
			if(this.listaPrecio.setProductoLista[i].productos.productoId == formproductosAdd.value.productoId)
				ind = i;
			//else
			//	console.log("i",i);
		}
		const nuevo_productoVenta = new ProductoVenta();
		//this.productoVenta.producto
		nuevo_productoVenta.producto =this.listaPrecio.setProductoLista[ind].productos;
		nuevo_productoVenta.cantidad = formproductosAdd.value.formCantidad
		nuevo_productoVenta.precioUnitario = this.listaPrecio.setProductoLista[ind].precio;
		nuevo_productoVenta.total = this.listaPrecio.setProductoLista[ind].precio * nuevo_productoVenta.cantidad;

		this.venta.setProductoVenta.push(nuevo_productoVenta);
		//console.log("ProductoVenta",nuevo_productoVenta);
		//console.log("setProductoVenta",this.setProductoVenta);
		//this.getProductoVenta();
		//console.log("totalVenta",this.venta.totalVenta);
		//console.log(nuevo_productoVenta.total);
		//console.log("totalVenta",this.venta.totalVenta + nuevo_productoVenta.total);

		//if(formproductosAdd.value.descuento > 0)
		//	this.porcentDescuento = formproductosAdd.value.descuento
		//else
		//	this.porcentDescuento = 0
		
		this.venta.totalVenta = this.venta.totalVenta + nuevo_productoVenta.total;
		//console.log("totalVenta",this.venta.totalVenta );
		//console.log("formDescuento",formDescuento);
		if(formDescuento > 0){
			this.montoDescuento = (this.venta.totalVenta * formDescuento)/100;
			this.venta.descuento = this.montoDescuento;
		}
		//console.log("montoDescuento",this.montoDescuento );
		this.venta.totalVenta = this.venta.totalVenta - this.montoDescuento;
		//console.log("totalVenta",this.venta.totalVenta );
		//console.log("formIVA_Variable",formIVA_Variable);
		this.venta.ivaTotal =  (this.venta.totalVenta * formIVA_Variable)/100;
		//console.log("ivaTotal",this.venta.ivaTotal );
		this.venta.pagoTotal = this.venta.totalVenta + this.venta.ivaTotal
		//console.log("pagoTotal",this.venta.pagoTotal );

		//console.log("VEnta",this.venta);
	}


	guardar(ventaAdd:NgForm){
		//console.log("venta ADD/Update ID:", this.id);
		//if (this.id==null) {
			// Add user
		
			//Creo el venta desde el formulario
			//this.venta=ventaAdd.value;
			//console.log("Venta:",this.venta);
		
			this._ventaService.addVenta(this.venta)
				.subscribe(result => {
 					if(result.status==201){
 						//this._router.navigate(['/ventas/'+result.json().id]);
 						console.log("Result Controler",result.status);
 					}else{
 						//console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					//console.log(<any>error);
 				})
 		//}else{
 			// Update user
			
			//Actualizo el venta desde el formulario
			// this.venta=ventaAdd.value;
			// this.venta.id=this.id;
			// //console.log("venta:",this.venta);
		
			// this._ventaService.updateVenta(this.venta)
			// 	.subscribe(result => {
			// 	//console.log("Result Controler",result.status);
 		// 			if(result.status==200){
 		// 				this._router.navigate(['/ventas/'+result.json().id]);
 		// 			}else{
 		// 				//204 -- No Content
 		// 				//console.log("Result Controler",result.status);
			// 		}
 		// 		},
 		// 		error => {
 		// 			//console.log(<any>error);
 		// 		})
 		// }

	}
}