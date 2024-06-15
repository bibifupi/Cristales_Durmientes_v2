package cristales.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import cristales.demo.Model.Usuario;

public interface UsuarioRepositorio extends  JpaRepository <Usuario, Integer> {

    //Como puede obtener nulos, se utiliza el Optional
        //findByUSername es la la consulta que se hace a la BD (select * from blablabla)
    Optional <Usuario> findByUsername(String username);

    Optional<Usuario> findByUsernameAndPassword(String username, String password);

    //Ranking para el perfil de los 5 primeros
    List<Usuario> findTop5ByOrderByIdNivelDesc();
}
