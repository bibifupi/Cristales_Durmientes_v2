package cristales.demo.Model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

//Esta clase User se puede escribir en BD
@Entity
//Tabla en la que se apunta
@Table(name="Usuario")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue
    Integer idUsuario;
    
    @Column(nullable = false)
    String username;
    
    @Column(nullable = false)
    String password;

    @Column(length = 500, nullable = false)
    String imagen;
    
    @Enumerated(EnumType.STRING) 
    Role role;

    @Column(nullable = false)
    private int idNivel;
    
    /* FUNCIONES */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
    //Devolvemos una lista que contiene un único objeto que da la autoridad al usuario autentificado
      return List.of(new SimpleGrantedAuthority((role.name())));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }


    @Override
    public boolean isAccountNonExpired() {
       return true;
    }

    @Override
    public boolean isAccountNonLocked() {
       return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
