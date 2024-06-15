package cristales.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import cristales.demo.Model.Jefe;

public interface JefeRepositorio extends JpaRepository <Jefe, Integer> {
    
    Optional <Jefe> findByIdJefe (int idJefe);
    Optional <Jefe> findByIdNivel (int idNivel);
    Optional <Jefe> findByIdUsuario (int idUSuario);
    Optional <Jefe> findByIdNivelAndIdUsuario (int idNivel, int idUSuario);
    
}
