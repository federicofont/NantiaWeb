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
	selector: 'formVentaDetail',
	templateUrl: '../venta/venta-detail.html',
	providers: [VentaService, ListaPrecioService, ClienteService, UsuarioService, FabricaService, Fecha],
	styleUrls: ['./venta.style.css']
})

export class VentaDetailComponent{
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
			////console.log(("id",parametros.id);
			this.id = parametros['id'];
			})
	}
	 

	ngOnInit(){
		this.getVenta(this.id);
		this.getClientes();
		this.getListaPrecios();
		this.getUsuarios();
		this.getFabricas();

		//this.getUsuario(this.usuarios[1].id);
		//this.getFabricaDeUsuario(this.fabricas[1].id)
		//yyyy-MM-dd HH:mm:ss
		////console.logthis.fechaActual.getFullYear);
		/*//console.logthis.fechaActual.getFullYear());
		//console.logthis.fechaActual.getMonth());
		//console.logthis.fechaActual.getDate());
		//console.logthis.fechaActual.getHours());
		//console.logthis.fechaActual.getMinutes());
		//console.logthis.fechaActual.getSeconds());
		*/

	}


    getVenta(id){
        this._ventaService.getVenta(id).subscribe(
            (result : any) =>{
                if (result.id > 0) {
                     this.venta = result;
                }else{
                    //console.log("ID:",this.id," Result Controler:",result.status);
                }

            },
            error =>{
                //console.log(<any>error);
            }
        );
    }
	getClientes(){
		this._clienteService.getClientes().subscribe(
			(result : any) =>{
				if (result.length > 0) {
					 this.clientes = result;
				}else{
					//console.log("Result Controler",result.status); 
				}
			},
			error =>{
				//console.log(<any>error);
			}
		);
	}

	getCliente(formCliente:number){
		this._clienteService.getCliente(formCliente).subscribe(
			(result:Cliente) =>{
				this.venta.cliente = result;
				/*if (result.length > 0) {
					 this.venta.cliente = result;
				}else{
					//console.log("Result Controler",result.status); 
				}*/
			},
			error =>{
				//console.log(<any>error);
			}
		);
	}

	getListaPrecios(){
	this._listaprecioService.getListaPrecios().subscribe(
				(result : any) =>{
					if (result.length > 0) {
						 this.listaPrecios = result;
						 this.getListaPrecio(this.listaPrecios[1].id);
					}else{
						//console.log("Result Controler:",result.status);
					}

				},
				error =>{
					//console.logerror);
				}
			)
	}


	getListaPrecio(idLista: number){
	this._listaprecioService.getListaPrecio(idLista).subscribe(
				(result : any) =>{
					if (result.id > 0) {
						 this.listaPrecio = result;
					}else{
						//console.log("Result Controler:",result.status);
					}

				},
				error =>{
					//console.logerror);
				}
			)
	}

	getUsuarios(){
		this._usuarioService.getUsuarios().subscribe(
			(result : any) =>{
				if (result.length > 0) {
					 this.usuarios = result;
					 ////console.log(("usuarios:",this.usuarios);
					 this.getUsuario(this.usuarios[1].id);
				}else{
					//console.log("Result Controler:",result.status);
				}

			},
			error =>{
				//console.logerror);
			}
		)
	}

	getUsuario(idUsuario:number){
		this._usuarioService.getUsuario(idUsuario).subscribe(
			(result : any) =>{
				if (result.id > 0) {
					 this.venta.usuario = result;
				}else{
					//console.log("ID:",this.id," Result Controler:",result.status);
				}

			},
			error =>{
				//console.logerror);
			}
		)
	}

	getFabricas(){
		this._fabricaService.getFabricas().subscribe(
			(result : any) =>{
				if (result.length > 0) {
					 this.fabricas = result;
					 ////console.log(("Fabricas",this.fabricas);
					 this.getFabricaDeUsuario(this.fabricas[1].id);
				}else{
					//console.log("ID:",this.id," Result Controler:",result.status);
				}

			},
			error =>{
				//console.logerror);
			}
		)
	}

	getFabricaDeUsuario(idFabrica:number){
		this._fabricaService.getFabrica(idFabrica).subscribe(
			(result : any) =>{
				if (result.id > 0) {
					 this.fabrica = result;
					 this.venta.fabricaid=this.fabrica.id;
				}else{
					//console.log("ID:",this.id," Result Controler:",result.status);
				}

			},
			error =>{
				//console.logerror);
			}
		)
	}



};