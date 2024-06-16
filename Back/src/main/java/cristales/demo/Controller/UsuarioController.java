package cristales.demo.Controller;
/* Aquí estan las llamadas de peticiones del Frontend al Backend */

import java.util.List;

import lombok.extern.slf4j.Slf4j;

import cristales.demo.Service.Usuario.UsuarioServicio;
import cristales.demo.dto.UsuarioLoginDTO;
import cristales.demo.dto.UsuarioRegistroDTO;
import cristales.demo.dto.UsuarioRequestDTO;
import cristales.demo.dto.UsuarioResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(value = "/api/usuario")
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class UsuarioController {

    @Autowired
    UsuarioServicio usuarioServicio;
    

    @GetMapping
    public String Bienvenida () {
        return "Bienvenido al Back de Cristales Durmientes, ¿nos aprobáis? :D ";
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

    @PutMapping("/update")
    public void updateUser(@RequestBody UsuarioRequestDTO usuarioRequestDTO) {
        
        usuarioServicio.guardarUsuario(usuarioRequestDTO);

    }

    @DeleteMapping ("/borrar/{username}")
    public void borrarUsuario (@PathVariable String username ) {

        usuarioServicio.borrarUsuario(username);

    }

    @GetMapping("/ranking")
    public List<UsuarioResponse> rankingUsuarios(){
        return usuarioServicio.findTop5ByOrderByIdNivelDesc();
    }
    
}
