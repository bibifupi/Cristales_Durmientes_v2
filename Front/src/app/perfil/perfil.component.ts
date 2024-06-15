import { Component } from '@angular/core';
import { UsuarioResponse } from '../_modelo/usuarioResponse';
import { UsuarioService } from '../_servicio/usuario.service';

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

  constructor(private usuarioService: UsuarioService) {
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


 }

