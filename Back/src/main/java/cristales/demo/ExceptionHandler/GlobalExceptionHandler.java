//Manejo de las excepciones
//Manejar de manera centralizada las exccepciones en los difeentes controladores de la api
//Si el error se produce a nivel de filtro, el global exception handler no lo intercepta

package cristales.demo.ExceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    //clase argumentos
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handlerArgumentException(IllegalArgumentException ex) {
        //devlvemos el mensaje de la excepcion y el estado del lado del cliente (400)
        return new ResponseEntity<String>(ex.getMessage(),HttpStatus.BAD_REQUEST);
    }


    //clase runtime
    @ExceptionHandler(RuntimeException.class)

    //devlvemos el mensaje de la excepcion y el estado runtime del lado del servidor (500)
    public ResponseEntity<String> handlerRuntimeException(RuntimeException ex) {    
        return new ResponseEntity<String>(ex.getMessage(),HttpStatus.BAD_GATEWAY);
    }
}
