import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { UsuarioService } from '../_servicio/usuario.service';
import { Router } from '@angular/router';
import { UsuarioResponse } from '../_modelo/usuarioResponse';

@Component({
  selector: 'app-mundo',
  standalone: true,
  imports: [],
  templateUrl: './mundo.component.html',
  styleUrl: './mundo.component.css'
})
export class MundoComponent implements AfterViewInit {

  // Objeto de perfil del usuario
  perfil!: UsuarioResponse;

  // Lista de scripts a cargar
  scripts = [
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
    'assets/mundo/data/collisions.js',
    'assets/mundo/data/puzzleZones1.js',
    'assets/mundo/data/puzzleZones2.js',
    'assets/mundo/data/puzzleZones3.js',
    'assets/mundo/data/tetrisZones.js',
    'assets/mundo/classes.js',
    'assets/mundo/index.js',
  ];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private renderer: Renderer2
  ) {
    // Carga el perfil del usuario al inicializar el componente desde el servicio
    this.perfil = this.usuarioService.getPerfil();
    console.log('Cargamos el perfil', this.perfil);
  }

  ngAfterViewInit(): void {
    // Carga los scripts especificados en la lista
    this.scripts.forEach(src => this.cargarScript(src));
  }

  // Método genérico para cargar un script
  private cargarScript(src: string): void {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.onload = () => { console.log(`Script ${src} cargado correctamente.`); };
    script.onerror = (error: any) => { console.error(`Fallo al cargar el script ${src}.`, error); };
    this.renderer.appendChild(document.body, script);
  }

  // Guarda el estado actual de los acertijos en el perfil del usuario
  guardar(): void {
    console.log('Guardar');
    console.log('this.perfil.nivelDTO.acertijoDTOList:', this.perfil.nivelDTO.acertijoDTOList);

    // Asigna los estados de los acertijos al perfil del usuario
    this.perfil.nivelDTO.acertijoDTOList.forEach(
      (acertijo, index) => { acertijo.superado = sessionStorage.getItem(`puzzle${index + 1}Completed`) == 'true' ? true : false; });

    // Asigna el estado del tetris al perfil del usuario
    this.perfil.nivelDTO.jefeDTO.cristal = sessionStorage.getItem('tetrisCompleted') == 'true';

    console.log('this.perfil:', this.perfil);

    // Actualiza el perfil del usuario en sessionStorage
    this.usuarioService.setPerfil(this.perfil);

    // Actualiza el perfil del usuario en el servidor
    this.usuarioService.updateUser(this.perfil).subscribe({
      next: (data) => console.log('Respuesta en perfil', data),
      error: (err) => alert(err.toString())
    });
  }

  // Guarda el perfil y navega a la página de perfil
  salir(): void {
    this.guardar();
    console.log('Salir');
    this.router.navigate(['/perfil']);
  }

}
