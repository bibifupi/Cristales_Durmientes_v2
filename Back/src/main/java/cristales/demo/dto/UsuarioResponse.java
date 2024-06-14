package cristales.demo.dto;

//Transformar la infromación JSON al objeto Usuario

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioResponse implements Serializable {

    private String username;
    private String imagen;
    private NivelDTO nivelDTO;
    
}
