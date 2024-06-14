package cristales.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cristales.demo.Model.Acertijo;

public interface AcertijoRepositorio extends JpaRepository <Acertijo, Integer>  {

    //Acertijo se obtiene por:
        //idNivel (una lista de acertijos por idUsuario)
    List <Acertijo> findByIdUsuario (int idUsuario);
        //idNivel + idUsuario (una lista de acertijos realizados por el usuario)
    List <Acertijo> findByIdNivelAndIdUsuario (int idNivel, int idUsuario);
        //idNivel + idUsuario + aceetijoName(una lista de acertijos realizados por el usuario)
    List <Acertijo> findByIdNivelAndIdUsuarioAndIdAcertijo (int idNivel, int idUsuario, int idAcertijo);
    
}
