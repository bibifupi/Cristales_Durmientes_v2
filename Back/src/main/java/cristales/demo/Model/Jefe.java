package cristales.demo.Model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Entity
@Table(name="Jefe")
public class Jefe {

    @Id
    @GeneratedValue
    private int id;

    @Column(nullable = false)
    private int idJefe;

    @Column(nullable = false)
    private boolean cristal;

     @Column(nullable = false)
    private int idNivel;
    
    @Column(nullable = false)
    private int idUsuario;
    
}
