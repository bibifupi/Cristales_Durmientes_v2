package cristales.demo.Service.Nivel;

import java.util.List;

import cristales.demo.Model.Nivel;

public interface NivelServicio {
    
    List <Nivel> findByIdUsuario(int idUsuario);
    List<Nivel> findByIdNivelAndIdUsuario (int idNivel, int idUsuario);

    Nivel save (Nivel nivel);

}
