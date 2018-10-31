import { Producto } from '../productos/producto.model';

export class ProductoVenta{
  constructor(
    public id:number = null,
    public producto:Producto = new Producto(),
    public cantidad:number = 0,
    public precioUnitario:number = 0,
    public total:number = 0
    ){}
}
