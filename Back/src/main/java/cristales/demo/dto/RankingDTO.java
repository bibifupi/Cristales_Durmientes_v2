package cristales.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RankingDTO {

    private UsuarioRequestDTO username;
    private UsuarioRequestDTO imagen;
    private NivelDTO nivelListDTO;
    
    
}
