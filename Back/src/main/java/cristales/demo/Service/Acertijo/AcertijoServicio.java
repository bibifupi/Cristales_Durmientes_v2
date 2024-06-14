package cristales.demo.Service.Acertijo;

import java.util.List;

import cristales.demo.Model.Acertijo;

public interface AcertijoServicio {
    
    List <Acertijo> findByIdUsuario (int idUsuario);
    List <Acertijo> findByIdNivelAndIdUsuario (int idNivel, int idUsuario);
    List <Acertijo> findByIdNivelAndIdUsuarioAndIdAcertijo (int idNivel, int idUsuario, int idAcertijo);
    
    Acertijo saveAcertijo(Acertijo acertijo);

    
}
