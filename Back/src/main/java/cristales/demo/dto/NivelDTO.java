package cristales.demo.dto;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NivelDTO implements Serializable {

    private int id;
    private int idNivel;
    private List <AcertijoDTO> acertijoDTOList;
    private JefeDTO jefeDTO;
    
}
