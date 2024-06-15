package cristales.demo.Service.Jefe;

import java.util.Optional;

import cristales.demo.Model.Jefe;

public interface JefeServicio {

    Jefe findByIdJefe(int idJefe);
    Jefe findByIdNivel (int idNivel); 
    Jefe findByIdUsuario (int idUsuario); 
    Jefe findByIdNivelAndIdUsuario (int idNivel, int idUSuario);
    
    Jefe save (Jefe jefe);
}
