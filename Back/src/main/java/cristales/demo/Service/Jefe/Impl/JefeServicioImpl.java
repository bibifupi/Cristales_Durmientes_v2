package cristales.demo.Service.Jefe.Impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cristales.demo.Model.Jefe;
import cristales.demo.Repository.JefeRepositorio;
import cristales.demo.Service.Jefe.JefeServicio;

@Service
public class JefeServicioImpl implements JefeServicio{

    @Autowired
    private JefeRepositorio jefeRepositorio;

    @Override
    public Jefe findByIdJefe(int idJefe) {

        Jefe jefe = null;

        Optional <Jefe> jefeOptional = jefeRepositorio.findByIdJefe(idJefe);

        if(jefeOptional.isPresent()){
            jefe = jefeOptional.get();
        }

        return jefe;
    }

    @Override
    public Jefe findByIdNivel(int idNivel) {
        
        Jefe jefe = null;

        Optional <Jefe> jefeOptional = jefeRepositorio.findByIdNivel(idNivel);

        if(jefeOptional.isPresent()){
            jefe = jefeOptional.get();
        }

        return jefe;

    }

    @Override
    public Jefe findByIdUsuario(int idUsuario) {
        
        Jefe jefe = null;

        Optional <Jefe> jefeOptional = jefeRepositorio.findByIdUsuario(idUsuario);

        if(jefeOptional.isPresent()){
            jefe = jefeOptional.get();
        }

        return jefe;
    }

    @Override
    public Jefe findByIdNivelAndIdUsuario(int idNivel, int idUsuario) {
        
        Jefe jefe = null;

        Optional <Jefe> jefeOptional = jefeRepositorio.findByIdNivelAndIdUsuario(idNivel, idUsuario);

        if(jefeOptional.isPresent()){
            jefe = jefeOptional.get();
        }

        return jefe;

    }

    @Override
    public Jefe save(Jefe jefe) {
                
        return jefeRepositorio.save(jefe);

    }
   
}
