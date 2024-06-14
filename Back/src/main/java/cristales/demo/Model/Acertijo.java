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
//Esta clase User se puede escribir en BD
@Entity
//Tabla en la que se apunta
@Table(name="Acertijo")
public class Acertijo {
    
    @Id
    @GeneratedValue
    private int id;

    @Column(nullable = false)
    private int idAcertijo;

    @Column(nullable = false)
    private boolean superado;

    @Column(nullable = false)
    private int idNivel;
    
    @Column(nullable = false)
    private int idUsuario;
    
}
