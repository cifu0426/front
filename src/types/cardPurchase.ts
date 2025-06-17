export interface IPurchases {
    id: number;
    fecha: string;
    total: number;
    productos: {
        id: number;
        nombre: string;
        precio: number;
        stock: number;
        categoria: string;
    }[];
}