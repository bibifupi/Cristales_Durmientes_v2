import { Component } from '@angular/core';
import { UsuarioResponse } from '../_modelo/usuarioResponse';
import { UsuarioService } from '../_servicio/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  // Array para almacenar los usuarios top del ranking
  lista_Ranking: UsuarioResponse[] = [];

  // Objeto de perfil del usuario
  perfil!: UsuarioResponse;

  // Array para almacenar el estado de los acertijos
  acertijosSuperados: boolean[] = [false, false, false];

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.perfil = this.usuarioService.getPerfil();

    this.usuarioService.ranking().subscribe({
      next: (data) => this.lista_Ranking = data,
      error: (err) => alert(err.toString())
    });
  }

  jugar() {
    // Mapea el estado de los acertijos a acertijosSuperados
    this.acertijosSuperados = this.perfil.nivelDTO.acertijoDTOList.map(acertijo => acertijo.superado);
    console.log('Acertijos:', this.acertijosSuperados);

    // Guarda el estado de los acertijos en sessionStorage
    this.acertijosSuperados.forEach(
      (superado, index) => { sessionStorage.setItem(`puzzle${index + 1}Completed`, superado ? 'true' : 'false'); });

    // Guarda el estado del tetris en sessionStorage
    sessionStorage.setItem('tetrisCompleted', this.perfil.nivelDTO.jefeDTO.cristal ? 'true' : 'false');

    // Navegamos a Mundo
    this.router.navigate(['/mundo']);
  }

  cerrarSesion() {
    // Limpiamos del sessionStorage el perfil
    this.usuarioService.clearPerfil();

    // Navegamos a Mundo
    this.router.navigate(['/login']);
  }

  // Borrramos el usuario de la base de datos
  eliminar(username: string) {
    this.usuarioService.eliminarUsuario(username).subscribe({
      next: response => {
        console.log('Usuario eliminado con éxito', response);
        this.usuarioService.clearPerfil();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        alert(err.toString());
      }
    });
  }
}

