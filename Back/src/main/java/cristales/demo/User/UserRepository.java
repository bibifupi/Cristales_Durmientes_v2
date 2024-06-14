/* package cristales.demo.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import cristales.demo.Model.Usuario;

public interface UserRepository extends JpaRepository<Usuario,Integer> {
    Optional<Usuario> findByUsername(String username); 
    
    //@Modifying()
    //@Query("update Usuario u set u.firstname=:firstname, u.lastname=:lastname, u.country=:country where u.id = :id")
    //void updateUser(@Param(value = "id") Integer id,   @Param(value = "firstname") String firstname, @Param(value = "lastname") String lastname , @Param(value = "country") String country);

}
 */