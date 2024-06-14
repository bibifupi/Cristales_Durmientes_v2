/* package cristales.demo.Auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor

//Origenes que van a tener acceso a los endpoints
@CrossOrigin(origins = {"http://localhost:4200"})
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){     
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.register(request));
    }
}
 */