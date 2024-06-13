package cristales.demo.dto;

import cristales.demo.Model.Nivel;
import cristales.demo.Model.Progreso;
import cristales.demo.Model.Role;
import cristales.demo.Model.Usuario;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioRegisterDTO {

    //private int idUsuario;
    
    @NotEmpty
    @Size(min = 2, max = 10)
    private String username;

    @NotEmpty
    @Size(min = 8, max = 10)
    private String password;

    //@NotEmpty
    @Size(min = 3, max = 500)
    private String imagen;

    @NotNull
    private Role role;

    @NotNull
    private Nivel idNivel;

    @NotNull
    private Progreso progreso;

    public UsuarioRegisterDTO castUsuarioRegisterDTO(Usuario u) {

        //idUsuario   = u.getIdUsuario();
        username    = u.getUsername();
        password    = u.getPassword();
        imagen      = u.getImagen();
        role         = u.getRole();
        //idNivel     = u.getIdNivel();
        //progreso    = u.getProgreso(); 

        return this;
    }


}
