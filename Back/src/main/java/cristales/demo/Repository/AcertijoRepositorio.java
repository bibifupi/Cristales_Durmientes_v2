package cristales.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cristales.demo.Model.Acertijo;

public interface AcertijoRepositorio extends JpaRepository <Acertijo, Integer>  {

    
    List <Acertijo> findByIdUsuario (int idUsuario);
    List <Acertijo> findByIdNivelAndIdUsuario (int idNivel, int idUsuario);
    List <Acertijo> findByIdNivelAndIdUsuarioAndIdAcertijo (int idNivel, int idUsuario, int idAcertijo);
    void deleteByIdUsuario(int idUsuario);
}
