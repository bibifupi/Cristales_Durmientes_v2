import { rol } from "./rol.enum";

export interface Usuario {
    id_Usuario: number,
    username: string,
    password: string,
    imagen: string,
    rol: rol,
    id_Nivel: number;
}