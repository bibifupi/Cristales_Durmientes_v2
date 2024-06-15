package cristales.demo.Service.Usuario;

import java.util.List;

import cristales.demo.dto.UsuarioLoginDTO;
import cristales.demo.dto.UsuarioRegistroDTO;
import cristales.demo.dto.UsuarioRequestDTO;
import cristales.demo.dto.UsuarioResponse;

public interface UsuarioServicio {
    // Metodos de la interfaz
    // DEvolvemos el usuario completo
    // Usuario findByUsername(String username);

    // Obtener el usuario qu está jugando (Jugador)
    // UsuarioResponse getUsuarioJuego (String username);

    // Registrar usuario
    UsuarioResponse registroUsuario(UsuarioRegistroDTO usuarioRegistroDTO);

    // Login usuario
    UsuarioResponse loginUsuario(UsuarioLoginDTO usuarioLoginDTO);

    // Guardar usuario
    void guardarUsuario(UsuarioRequestDTO usuarioRequestDTO);

    // Ranking 5 mejores usuarios
    List<UsuarioResponse> findTop5ByOrderByIdNivelDesc();
}
