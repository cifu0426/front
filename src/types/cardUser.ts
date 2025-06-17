export interface IUser {
    id: number;
    nombreusuario: string;
    rol: {
        id: number;
        nombre: string;
    };
}