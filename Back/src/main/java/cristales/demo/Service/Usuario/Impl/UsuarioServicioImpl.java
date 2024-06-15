package cristales.demo.Service.Usuario.Impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cristales.demo.Model.Acertijo;
import cristales.demo.Model.Jefe;
import cristales.demo.Model.Nivel;
import cristales.demo.Model.Usuario;
import cristales.demo.Repository.UsuarioRepositorio;
import cristales.demo.Service.Acertijo.AcertijoServicio;
import cristales.demo.Service.Jefe.JefeServicio;
import cristales.demo.Service.Nivel.NivelServicio;
import cristales.demo.Service.Usuario.UsuarioServicio;
import cristales.demo.dto.AcertijoDTO;
import cristales.demo.dto.JefeDTO;
import cristales.demo.dto.NivelDTO;
import cristales.demo.dto.UsuarioLoginDTO;
import cristales.demo.dto.UsuarioRegistroDTO;
import cristales.demo.dto.UsuarioRequestDTO;
import cristales.demo.dto.UsuarioResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UsuarioServicioImpl implements UsuarioServicio {

    /*Cuando el objeto no existe para spring (UsuarioRepositorio) 
    usamos Autowired para que automaticamente se vincule ese objeto conmigo (UsuarioServicioImpl)*/
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private NivelServicio nivelServicio;

    @Autowired
    private AcertijoServicio acertijoServicio;

    @Autowired
    private JefeServicio jefeServicio;


    @Override
    public UsuarioResponse loginUsuario(UsuarioLoginDTO usuarioLoginDTO){

        UsuarioResponse usuarioResponse = null;
        Usuario usuario = findByUsernameAndPassword(usuarioLoginDTO.getUsername(), usuarioLoginDTO.getPassword());
        
        if (usuario != null) {
            log.info("Encontrado");
            usuarioResponse = getUsuarioJuego(usuario);
        } else {
            log.info("no encontrado en Implements");
        }

        return usuarioResponse;
    }

    @Override
    public UsuarioResponse registroUsuario(UsuarioRegistroDTO usuarioRegistroDTO) {
    log.info("Las contraseñas son diferentes");
        UsuarioResponse usuarioResponse = null;

        if (usuarioRegistroDTO.getPassword().equalsIgnoreCase(usuarioRegistroDTO.getRepeatPassword())) {

            if ( findByUsername(usuarioRegistroDTO.getUsername()) == null ){ 
                
                Usuario usuario = Usuario.builder()
                    .username(usuarioRegistroDTO.getUsername())
                    .password(usuarioRegistroDTO.getPassword())
                    .idNivel(0)
                    .imagen("")
                    .build();

                //Genera la entrada a la BD y el idUsuario
                usuarioRepositorio.save(usuario);

                log.info("USUARIO: {}", usuario);

                usuario = findByUsername(usuarioRegistroDTO.getUsername());

                if (usuario != null) {

                    Jefe jefe = Jefe.builder()
                        .idJefe(0)
                        .cristal(false)
                        .idNivel(0)
                        .idUsuario(usuario.getIdUsuario())
                        .build();
                        jefeServicio.save(jefe);

                    JefeDTO jefeDTO = JefeDTO.builder().cristal(jefe.isCristal()).build();

                    List <Acertijo> acertijoList = new ArrayList<>();
                    List<AcertijoDTO> acertijoDTOList = new ArrayList<>();
                    //for porque se guarda más de un acertijo
                    for (int i=1; i<=3; i++){

                        Acertijo acertijo = Acertijo.builder()
                            .idAcertijo(i)
                            .superado(false)
                            .idNivel(0)
                            .idUsuario(usuario.getIdUsuario())
                            .build();
                        
                        //Guarda el acertijo
                        acertijoList.add(acertijoServicio.saveAcertijo(acertijo));

                        AcertijoDTO acertijoDTO = AcertijoDTO.builder()
                            .idAcertijo(acertijo.getIdAcertijo())
                            .superado(acertijo.isSuperado())
                            .build();

                        acertijoDTOList.add(acertijoDTO);

                        Nivel nivel = Nivel.builder()
                            .idNivel(0)
                            .idAcertijo(i)
                            .idJefe(0)
                            .idUsuario(usuario.getIdUsuario())
                            .build();
                        nivelServicio.save(nivel);
                
                    }

                    NivelDTO nivelDTO = NivelDTO.builder()
                    .idNivel(0)
                    .acertijoDTOList(acertijoDTOList)
                    .jefeDTO(jefeDTO)
                    .build();


                    usuarioResponse = UsuarioResponse.builder()
                        .username(usuarioRegistroDTO.getUsername())
                        .nivelDTO(nivelDTO)
                        .imagen("")
                        .build();
                }
                
            } else {
                throw new RuntimeException("El usuario: " + usuarioRegistroDTO.getUsername() + " ya existe.");
            }
        }

        return usuarioResponse;
    }

    @Override
    public void guardarUsuario(UsuarioRequestDTO usuarioRequestDTO) {

        Usuario usuario = findByUsername(usuarioRequestDTO.getUsername());

        if (usuario != null) {

            Jefe jefe = jefeServicio.findByIdUsuario(usuario.getIdUsuario());

            jefe.setCristal(usuarioRequestDTO.getNivelDTO().getJefeDTO().isCristal());
            jefe.setIdNivel(usuarioRequestDTO.getNivelDTO().getIdNivel());
            jefeServicio.save(jefe);


            List <Acertijo> acertijoList = acertijoServicio.findByIdUsuario(usuario.getIdUsuario());
            List <AcertijoDTO> acertijoDTOlList = usuarioRequestDTO.getNivelDTO().getAcertijoDTOList();
            List <Nivel> nivelList = nivelServicio.findByIdUsuario(usuario.getIdUsuario());

            for (int i=0; i<3; i++){

                Acertijo acertijo = acertijoList.get(i);
                acertijo.setIdAcertijo(acertijoDTOlList.get(i).getIdAcertijo());
                acertijo.setSuperado(acertijoDTOlList.get(i).isSuperado());
                acertijo.setIdNivel(usuarioRequestDTO.getNivelDTO().getIdNivel());
                acertijoServicio.saveAcertijo(acertijo);
     
                Nivel nivel = nivelList.get(i);
                nivel.setIdAcertijo(acertijoDTOlList.get(i).getIdAcertijo());
                nivel.setIdJefe(jefe.getIdJefe());

                nivelServicio.save(nivel);
            }

            usuario.setIdNivel(usuarioRequestDTO.getNivelDTO().getIdNivel());
            //usuario.setImagen(usuarioRequestDTO.getImagen());
            usuarioRepositorio.save(usuario);
        }

    }


    //Metdos que van a implementar de la interfaz UsuarioServicio
    private Usuario findByUsername (String username) {
    
        Usuario usuario = null;
        Optional <Usuario> usuarioOptional = usuarioRepositorio.findByUsername(username);

        //isPresent es si existe
        if(usuarioOptional.isPresent()){
            usuario = usuarioOptional.get();
        }

        return usuario;
    }

    private Usuario findByUsernameAndPassword(String username, String password) {

        Usuario usuario = null;
        log.info("El usuario es: " + usuario);
        
        Optional <Usuario> usuarioOptional = usuarioRepositorio.findByUsernameAndPassword(username, password);
        log.info("El repositorio es: " + usuarioRepositorio);
        log.info(" usuario " + username + " pass " + password);
        log.info("El Optional es: " + usuarioOptional);
        
        if(usuarioOptional.isPresent()){
            log.info("Usuario Optional SI");
            usuario = usuarioOptional.get();
        } else {
            log.info("Usuario Optional NO");

        }

        return usuario;
    }

    //Recupera los acertijos que tiene el jugador
    private UsuarioResponse getUsuarioJuego(Usuario usuario) {

        
        //Buscamos el Jugador por username
        //Usuario usuario = findByUsername(username);

        //Buscamos el Nivel del jugador por idNivel e idUsuario
        List<Nivel> nivel = nivelServicio.findByIdNivelAndIdUsuario(usuario.getIdNivel(), usuario.getIdUsuario());
        
        //Buscamos los Acertijos que ha hecho el Jugador por idNivel y idUsuario
        List <Acertijo> acertijoList = acertijoServicio.findByIdNivelAndIdUsuario(usuario.getIdNivel(), usuario.getIdUsuario());

        //Buscamos el Jefe del Jugador por idJefe
        Jefe jefe = jefeServicio.findByIdNivelAndIdUsuario(usuario.getIdNivel(), usuario.getIdUsuario());

        
        JefeDTO jefeDTO = JefeDTO.builder().cristal(jefe.isCristal()).build();

        List <AcertijoDTO> acertijoDTOList = new ArrayList<>();
        for (Acertijo acertijo : acertijoList ) {

            acertijoDTOList.add(AcertijoDTO.builder()
                .idAcertijo(acertijo.getIdAcertijo())
                .superado(acertijo.isSuperado())
                .build());
        }

        NivelDTO nivelDTO = NivelDTO.builder()
            .idNivel(nivel.get(0).getIdNivel())
            .acertijoDTOList(acertijoDTOList)
            .jefeDTO(jefeDTO)
            .build();
        
        UsuarioResponse usuarioResponse = UsuarioResponse.builder()
            .username(usuario.getUsername())
            .imagen(usuario.getImagen())
            .nivelDTO(nivelDTO)
            .build();

        return usuarioResponse;

    }
}