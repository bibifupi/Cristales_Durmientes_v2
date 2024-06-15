package cristales.demo.Controller;
/* Aquí estan las llamadas de peticiones del Frontend al Backend */

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import cristales.demo.Service.Usuario.UsuarioServicio;
import cristales.demo.dto.RankingDTO;
import cristales.demo.dto.UsuarioLoginDTO;
import cristales.demo.dto.UsuarioRegistroDTO;
import cristales.demo.dto.UsuarioRequestDTO;
import cristales.demo.dto.UsuarioResponse;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping(value = "/api/usuario") //solo gestiona peticiones a Usuario

@Slf4j
public class UsuarioController {
    //conexion con el servicio
    @Autowired
    UsuarioServicio usuarioServicio;

    //METODOS

    //Busqueda del usuario para cargar datos en el perfil
    /* @GetMapping ("/{username}")
    public Usuario getUsuarioByUsername (@PathVariable(value = "username") String username){
        
        Usuario usuario = null;

        usuario = usuarioServicio.findByUsername(username);

        return usuario;

    } */

    @GetMapping
    public String Bienvenida () {
        return "Hola mundo";
    }


    @PostMapping("/login")
    public UsuarioResponse loginUsuario(@RequestBody UsuarioLoginDTO usuarioLoginDTO) {
        
        UsuarioResponse usuarioResponse = usuarioServicio.loginUsuario(usuarioLoginDTO);

        if (usuarioResponse == null) {
            throw new RuntimeException("No se ha podido hacer login para el usuario: " + usuarioLoginDTO.getUsername());
        }

        return usuarioResponse;
    }
    

    @PostMapping("/registro")
    public UsuarioResponse registroUsuario(@RequestBody UsuarioRegistroDTO usuarioRegistroDTO) {

        UsuarioResponse usuarioResponse = usuarioServicio.registroUsuario(usuarioRegistroDTO);

        if (usuarioResponse == null) {
            throw new RuntimeException("No se ha podido hacer registrar al usuario:" + usuarioRegistroDTO.getUsername());
        }

        return usuarioResponse;
    }

    @GetMapping("/perfil")
    public UsuarioResponse perfilUSuario(){
        UsuarioResponse user = null;
        return user;
    }
    

    @PutMapping("/update")
    public void updateUser(@RequestBody UsuarioRequestDTO usuarioRequestDTO) {
        
        usuarioServicio.guardarUsuario(usuarioRequestDTO);

    }


    @GetMapping("/ranking")
    public UsuarioResponse rankingUsuarios(RankingDTO RankingDTO){
        return null;
    }
    
}
