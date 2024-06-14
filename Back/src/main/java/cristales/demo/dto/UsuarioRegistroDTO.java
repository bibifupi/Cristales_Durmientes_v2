package cristales.demo.dto;

import java.io.Serializable;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioRegistroDTO implements Serializable {
    
    @NotEmpty
    @Size(min = 3, max = 16)
    private String username;
    
    @NotEmpty
    @Size(min = 8, max = 16)
    private String password;
    
    @NotEmpty
    @Size(min = 8, max = 16)
    private String repeatPassword;

}
