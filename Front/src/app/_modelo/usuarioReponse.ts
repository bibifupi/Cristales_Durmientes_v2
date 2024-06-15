export interface UsuarioResponse {
    username: string;
    imagen:   string;
    nivelDTO: NivelDTO;
}

export interface NivelDTO {
    id:              number;
    idNivel:         number;
    acertijoDTOList: AcertijoDTOList[];
    jefeDTO:         JefeDTO;
}

export interface AcertijoDTOList {
    idAcertijo: number;
    superado:   boolean;
}

export interface JefeDTO {
    cristal: boolean;
}