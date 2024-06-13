package cristales.demo.Auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import cristales.demo.Jwt.JwtService;
import cristales.demo.Model.Nivel;
import cristales.demo.Model.Progreso;
import cristales.demo.Model.Role;
import cristales.demo.Model.Usuario;
import cristales.demo.User.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    //LOGIN
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user=userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token=jwtService.getToken(user);
        return AuthResponse.builder()
            .token(token)
            .build();

    }

    //REGISTER
    public AuthResponse register(RegisterRequest request) {

        //Pasamos los datos
        Usuario usuario = Usuario.builder()
            .username(request.getUsername())
            .password(passwordEncoder.encode( request.getPassword()))
            //.progreso(new Progreso())
            //.idNivel(new Nivel())
            .role(Role.USER)
            .build();
        
        //Se salvan los datos
        userRepository.save(usuario);

        //Obtención de un TOKEN que se retorna al Controller
        return AuthResponse.builder()
            .token(jwtService.getToken(usuario))
            .build();
        
    }

}
