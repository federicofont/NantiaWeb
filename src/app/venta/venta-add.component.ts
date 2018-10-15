import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { VentaService } from './venta.service';
import { Venta } from './venta.model';
import { Pago } from './pago.model';

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

import { Fecha } from '../fecha';

@Component ({
	selector: 'formVentaAdd',
	templateUrl: '../venta/venta-add.html',
	providers: [VentaService, ListaPrecioService, ClienteService, UsuarioService, FabricaService, Fecha],
	styleUrls: ['./venta.style.css']
})

export class VentaAddComponent{
	public titulo: string;

	usuarios: Usuario[] = [];
	fabricas: Fabrica[] = [];
	usuario: Usuario = new Usuario();
	cliente: Cliente = new Cliente();
	fabrica: Fabrica = new Fabrica();

	clientes: Cliente[] =[];
	producto:Producto = new Producto();
	listaPrecios:ListaPrecio[] = [];
	listaPrecio: ListaPrecio = new ListaPrecio();
	productoLista: ProductoLista = new ProductoLista();
	setProductoLista:ProductoLista[] = [];
	productoVenta: ProductoVenta = new ProductoVenta();
	setProductoVenta: ProductoVenta[] = [];

	montoDescuento: number=0;
	subtotal: number = 0;
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
				private _fabricaService:FabricaService,
				private _fecha:Fecha
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
		this.getListaPrecios();
		this.getUsuarios();
		this.getFabricas();
		//this.getUsuario(this.usuarios[1].id);
		//this.getFabricaDeUsuario(this.fabricas[1].id)
		//yyyy-MM-dd HH:mm:ss
		//console.log(this.fechaActual.getFullYear);
		/*console.log(this.fechaActual.getFullYear());
		console.log(this.fechaActual.getMonth());
		console.log(this.fechaActual.getDate());
		console.log(this.fechaActual.getHours());
		console.log(this.fechaActual.getMinutes());
		console.log(this.fechaActual.getSeconds());
		*/

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

	getListaPrecios(){
	this._listaprecioService.getListaPrecios().subscribe(
				result =>{
					if(result.status == 200){
						 this.listaPrecios = result.json();
						 this.getListaPrecio(this.listaPrecios[1].id);
					}else{
						console.log("Result Controler:",result.status);
					}

				},
				error =>{
					console.log(error);
				}
			)
	}


	getListaPrecio(idLista: number){
	this._listaprecioService.getListaPrecio(idLista).subscribe(
				result =>{
					if(result.status == 200){
						 this.listaPrecio = result.json();
					}else{
						console.log("Result Controler:",result.status);
					}

				},
				error =>{
					console.log(error);
				}
			)
	}

	getUsuarios(){
		this._usuarioService.getUsuarios().subscribe(
			result =>{
				if(result.status == 200){
					 this.usuarios = result.json();
					 //console.log("usuarios:",this.usuarios);
					 this.getUsuario(this.usuarios[1].id);
				}else{
					console.log("Result Controler:",result.status);
				}

			},
			error =>{
				console.log(error);
			}
		)
	}

	getUsuario(idUsuario:number){
		this._usuarioService.getUsuario(idUsuario).subscribe(
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

	getFabricas(){
		this._fabricaService.getFabricas().subscribe(
			result =>{
				if(result.status == 200){
					 this.fabricas = result.json();
					 //console.log("Fabricas",this.fabricas);
					 this.getFabricaDeUsuario(this.fabricas[1].id);
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

		this.getCliente(formCliente);
		this.venta.fecha = this._fecha.getDate(); //yyyy-MM-dd HH:mm:ss
		this.venta.descuento = formDescuento;
		var ind:number=0;
		const nuevo_productoVenta = new ProductoVenta();
		/*Asocio el producto seleccionado con el de la lista de precios*/
    	for (var i = this.listaPrecio.setProductoLista.length - 1; i >= 0; i--) {
			if(this.listaPrecio.setProductoLista[i].productos.productoId == formproductosAdd.value.productoId)
				ind = i;
		}
		
		/*Genero el productoVenta y lo agrego a la coleccion setProductoVenta*/
		nuevo_productoVenta.producto =this.listaPrecio.setProductoLista[ind].productos;
		nuevo_productoVenta.cantidad = formproductosAdd.value.formCantidad
		nuevo_productoVenta.precioUnitario = this.listaPrecio.setProductoLista[ind].precio;
		nuevo_productoVenta.total = this.listaPrecio.setProductoLista[ind].precio * nuevo_productoVenta.cantidad;
		//console.log("nuevo_productoVenta",nuevo_productoVenta);
		this.venta.setProductoVenta.push(nuevo_productoVenta);

		/*Calculo el subtotal neto*/
		this.subtotal=0;
	    for (var i = this.venta.setProductoVenta.length - 1; i >= 0; i--) {
			this.subtotal = this.subtotal + this.venta.setProductoVenta[i].total;
		}
		//console.log("subtotal", this.subtotal);
	
		/*Calculo el iva sobre el Subtotal - Descuento*/
		this.venta.ivatotal =  ( (this.subtotal - formDescuento) * this.iva0)/100;
		
		/*Calculo (Subtotal - Descuento) + Iva*/
		this.venta.totalventa = ( (this.subtotal - formDescuento) + this.venta.ivatotal );
		//console.log("venta",this.venta);

		/*Total Pago*/
		this.venta.pagototal = this.venta.totalventa

		/*Cargo DataPago*/
		this.venta.datapago.clienteid = this.venta.cliente.id;
		this.venta.datapago.fechapago = this._fecha.getDate();
		this.venta.datapago.monto = this.venta.pagototal;

	}


	guardar(ventaAdd:NgForm){
		//console.log("venta ADD/Update ID:", this.id);
		//if (this.id==null) {
			// Add user
		
			//Creo el venta desde el formulario
			//this.venta=ventaAdd.value;
			console.log("Venta:",this.venta);
		
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