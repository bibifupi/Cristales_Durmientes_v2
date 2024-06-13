package cristales.demo.Model;

import java.time.LocalTime;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

public class Progreso {
    /* 
    @Id
    @GeneratedValue
    Integer idProgreso;

    @DateTimeFormat(pattern = "HH-mm-ss")
    private LocalTime tiempo;

    //@OneToOne
    //@JoinColumn(name="usuarioCristal") //Para poder cruzar con la columna cristal de Usuario
    private Usuario cristal;
    */
}
