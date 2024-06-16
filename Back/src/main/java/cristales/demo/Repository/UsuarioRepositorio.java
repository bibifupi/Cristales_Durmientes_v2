package cristales.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import cristales.demo.Model.Usuario;

public interface UsuarioRepositorio extends  JpaRepository <Usuario, Integer> {

    Optional <Usuario> findByUsername(String username);

    Optional<Usuario> findByUsernameAndPassword(String username, String password);

    List<Usuario> findTop5ByOrderByIdNivelDesc();

    void deleteByUsername(String username);
}
