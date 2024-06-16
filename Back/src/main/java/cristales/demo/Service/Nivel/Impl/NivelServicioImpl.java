package cristales.demo.Service.Nivel.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cristales.demo.Model.Nivel;
import cristales.demo.Repository.NivelRepositorio;
import cristales.demo.Service.Nivel.NivelServicio;
import jakarta.transaction.Transactional;

@Service
public class NivelServicioImpl implements NivelServicio {

    @Autowired
    private NivelRepositorio nivelRepositorio;

    @Override
    public List <Nivel> findByIdUsuario(int idUsuario) {
    
        List <Nivel> nivelList = nivelRepositorio.findByIdUsuario(idUsuario);

        return nivelList;
        
    }

    @Override
    public List <Nivel> findByIdNivelAndIdUsuario(int idNivel, int idUsuario) {

        List <Nivel> nivelList = nivelRepositorio.findByIdNivelAndIdUsuario(idNivel, idUsuario);

        if (nivelList == null || nivelList.isEmpty()) {
            throw new RuntimeException("El usuario no tiene nivel");
        }
        return nivelList;
    }

    @Override
    public Nivel save(Nivel nivel) {
        
        return nivelRepositorio.save(nivel);

    }

    @Transactional
    @Override
    public void deleteByIdUsuario(int idUSuario) {

        nivelRepositorio.deleteByIdUsuario(idUSuario);

    }
    
}
