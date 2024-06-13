package cristales.demo.Controller;
/* Aquí estan las llamadas de peticiones del Frontend al Backend */

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cristales.demo.dto.UsuarioRegisterDTO;
import jakarta.websocket.server.PathParam;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping(value = "/api/usuario") //solo gestiona peticiones a Usuario
//@CrossOrigin(origins = {"http://localhost:4200"}) //ruta raiz

@Slf4j
public class UsuarioController {

    //metodos con operativas y respuestas
    @GetMapping
    public String Bienvenida () {
        return "Hola mundo";
    }

    @PostMapping("/testpost")
    public String postMethodName(@RequestBody String entity) {
        //TODO: process POST request
        
        return entity;
    }

    @PostMapping("/register")
    public String registerUsuario(@RequestBody UsuarioRegisterDTO usuarioRegisterDTO) {


        log.info("USUARIO: {}", usuarioRegisterDTO.toString());


        return "Ha ido bien";
    }

    @GetMapping("/{id}")
    public String getUsuarioById(@PathVariable(value = "id") String id) {

        log.info("EL ID es: {}", id);

        return "EL id es :" + id;
    }
    
}
