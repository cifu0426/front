export interface ISales {
    id: number;
    fecha?: string;
    total?: number;
    cliente?: string;
    productos?: {
        id: number;
        nombre: string;
        precio: number;
        cantidad: number;
    }[];
    estado?: 'Completada' | 'Pendiente' | 'Cancelada';
}