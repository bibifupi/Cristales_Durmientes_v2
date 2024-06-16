package cristales.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cristales.demo.Model.Nivel;

public interface NivelRepositorio extends JpaRepository <Nivel, Integer> {

    List <Nivel> findByIdUsuario (int idUsuario);
    List <Nivel> findByIdNivelAndIdUsuario (int idNivel, int idUsuario);
    void deleteByIdUsuario(int idUsuario);
}
