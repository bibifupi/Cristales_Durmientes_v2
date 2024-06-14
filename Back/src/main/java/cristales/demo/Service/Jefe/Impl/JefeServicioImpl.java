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

        //isPresent es si existe
        if(jefeOptional.isPresent()){
            jefe = jefeOptional.get();
        }

        return jefe;
    }

    @Override
    public Jefe findByIdNivel(int idNivel) {
        
        Jefe jefe = null;

        Optional <Jefe> jefeOptional = jefeRepositorio.findByIdNivel(idNivel);

        //isPresent es si existe
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
    public Jefe save(Jefe jefe) {
                
        return jefeRepositorio.save(jefe);

    }

    
}
