export * from "./cardProduct";
export * from "./cardSales";
export * from "./cardPurchase";
export * from "./cardUser";

export interface IProduct {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion: string;
  cantidadDisponible: number;
}