export interface IPurchases {
    id: number;
    fecha?: string;
    total?: number;
    proveedor?: string;
    productos?: {
        id: number;
        nombre: string;
        precio: number;
        cantidad: number;
    }[];
    estado?: 'Recibida' | 'Pendiente' | 'Cancelada';
}