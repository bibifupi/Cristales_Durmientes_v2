import { Component } from '@angular/core';
import { UsuarioResponse } from '../_modelo/usuarioResponse';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  usuario: UsuarioResponse = {
    username: "bibi_guapa",
    imagen: "https://avatars.githubusercontent.com/u/103118802?s=400&u=92bac3ca1e8d33cc3fa58ed50afe79f73cea9f5a&v=4",
    nivelDTO: {
      id: 0,
      idNivel: 0,
      acertijoDTOList: [
        {
          idAcertijo: 1,
          superado: false
        },
        {
          idAcertijo: 2,
          superado: false
        },
        {
          idAcertijo: 3,
          superado: false
        }
      ],
      jefeDTO: {
        cristal: false
      }
    }
  };

  lista_Ranking: UsuarioResponse[] = [this.usuario, this.usuario, this.usuario, this.usuario, this.usuario];

  constructor() {
    // this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  }

  jugar(){
    window.location.href = '/vanilla/index.html';
  }


}
