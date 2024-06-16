package cristales.demo.Service.Usuario;

import java.util.List;

import cristales.demo.dto.UsuarioLoginDTO;
import cristales.demo.dto.UsuarioRegistroDTO;
import cristales.demo.dto.UsuarioRequestDTO;
import cristales.demo.dto.UsuarioResponse;

public interface UsuarioServicio {

    UsuarioResponse registroUsuario(UsuarioRegistroDTO usuarioRegistroDTO);

    UsuarioResponse loginUsuario(UsuarioLoginDTO usuarioLoginDTO);

    void guardarUsuario(UsuarioRequestDTO usuarioRequestDTO);

    List<UsuarioResponse> findTop5ByOrderByIdNivelDesc();

    void borrarUsuario(String username);
}
