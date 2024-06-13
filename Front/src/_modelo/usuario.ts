import { rol } from "./rol.enum";

export interface Usuarios{
id_Usuario:number,
username:string,
password:string,
imagen:string,
rol: rol;
}