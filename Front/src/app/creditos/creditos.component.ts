import { Component } from '@angular/core';
import { UsuarioResponse } from '../_modelo/usuarioResponse';
import { UsuarioService } from '../_servicio/usuario.service';

@Component({
  selector: 'app-creditos',
  standalone: true,
  imports: [],
  templateUrl: './creditos.component.html',
  styleUrl: './creditos.component.css'
})
export class CreditosComponent {
  // Objeto de perfil del usuario
  perfil!: UsuarioResponse;

  constructor(private usuarioService: UsuarioService) {
    // Carga el perfil del usuario 
    this.perfil = this.usuarioService.getPerfil();

    // Asigna los estados de los acertijos al perfil del usuario
    this.perfil.nivelDTO.acertijoDTOList.forEach(
      (acertijo, index) => { acertijo.superado = sessionStorage.getItem(`puzzle${index + 1}Completed`) == 'true' ? true : false; });

    // Asigna el estado del tetris al perfil del usuario
    this.perfil.nivelDTO.jefeDTO.cristal = sessionStorage.getItem('tetrisCompleted') == 'true';

    // Comprobamos si se ha conseguido un cristal
    if (sessionStorage.getItem('tetrisCompleted') == 'true') {
      this.perfil.nivelDTO.idNivel++;
      sessionStorage.removeItem('tetrisCompleted');
    }

    // Actualiza el perfil del usuario en sessionStorage
    this.usuarioService.setPerfil(this.perfil);

    // Actualiza el perfil del usuario en el servidor
    this.usuarioService.updateUser(this.perfil).subscribe({
      next: (data) => console.log('Respuesta en perfil', data),
      error: (err) => alert(err.toString())
    });
  }

}
