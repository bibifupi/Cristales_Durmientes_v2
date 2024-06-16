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

  lista_Ranking: UsuarioResponse[] = [];

  perfil!: UsuarioResponse;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.perfil = this.usuarioService.getPerfil();
    console.log('Consrtuctor perfil', this.perfil);

    this.usuarioService.ranking().subscribe({
      next: (data) => {
        this.lista_Ranking = data;
      },
      error: (err) => {
        console.log(err);
        alert(err.toString());
      }
    });
  }

  jugar() {
    this.router.navigate(['/mundo']); 



    // this.usuarioService.updateUser(this.usuario).subscribe({
    //   next: (data) => {
    //     console.log('Respuesta en perfil' ,data);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     alert(err.toString());
    //   }
    // });
    // window.location.href = '/vanilla/index.html';
  }

  eliminar(username: string) {
    this.usuarioService.eliminarUsuario(username).subscribe({
      next: response => {
        console.log('Usuario eliminado con éxito', response);
        this.router.navigate(['/login']); 
      },
      error: (err) => {
        console.log(err);
        alert(err.toString());
      }
    });
  }


}

