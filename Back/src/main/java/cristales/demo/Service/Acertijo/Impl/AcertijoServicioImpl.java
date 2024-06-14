package cristales.demo.Service.Acertijo.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cristales.demo.Model.Acertijo;
import cristales.demo.Repository.AcertijoRepositorio;
import cristales.demo.Service.Acertijo.AcertijoServicio;

@Service
public class AcertijoServicioImpl implements AcertijoServicio{

    @Autowired
    private AcertijoRepositorio acertijoRepositorio;

    @Override
    public List<Acertijo> findByIdUsuario(int idUsuario) {
        return acertijoRepositorio.findByIdUsuario(idUsuario);
    }

    @Override
    public List<Acertijo> findByIdNivelAndIdUsuario(int idNivel, int idUsuario) {
        return acertijoRepositorio.findByIdNivelAndIdUsuario(idNivel, idUsuario);
    }

    @Override
    public List<Acertijo> findByIdNivelAndIdUsuarioAndIdAcertijo(int idNivel, int idUsuario, int idAcertijo) {
        return acertijoRepositorio.findByIdNivelAndIdUsuarioAndIdAcertijo(idNivel, idUsuario, idAcertijo);
    }

    @Override
    public Acertijo saveAcertijo(Acertijo acertijo) {
        return acertijoRepositorio.save(acertijo);
    }
    
}
