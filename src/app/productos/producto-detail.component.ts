import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';
import { ProductoService } from './producto.service';
import { Producto } from './producto.model';
import { Envase } from '../envases/envase.model'

@Component ({
	selector: 'producto-detail',
	templateUrl: './producto-detail.html',
	providers: [ProductoService],
	styleUrls: ['./producto.style.css']
})

export class ProductoDetailComponent{
	public titulo: string;
	public producto: Producto = new Producto();
	public envase:Envase = new Envase()
	public id:number;

	constructor(private _productoService: ProductoService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute)
		{
		this.titulo = 'Producto';

		this._activatedRoute.params
			.subscribe( parametros=>{
			////console.log(("id",parametros.id);
			this.id = parametros['id'];
			})
		}
	
	ngOnInit(){
		////console.log(('producto-detail.component.ts cargado');

		this._productoService.getProducto(this.id).subscribe(
				(result:Producto) =>{
					if(result){
						////console.log(("Result:",result.json());
						 this.producto = result;
						if(this.producto)
							if(this.producto.envasesTipos){
								this.envase = this.producto.envasesTipos;
							}else{
								this.envase= new Envase();
							}
					}else{
						////console.log(("ID:",this.id," Result Controler:",result.status);
					}

				},
				error =>{
					//console.log(<any>error);
				}
			)
		};


	}
