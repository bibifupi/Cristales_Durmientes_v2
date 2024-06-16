import { AfterViewInit, Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-mundo',
  standalone: true,
  imports: [],
  templateUrl: './mundo.component.html',
  styleUrl: './mundo.component.css'
})
export class MundoComponent implements AfterViewInit {

  scripts = [
    'assets/mundo/data/collisions.js',
    'assets/mundo/data/puzzleZones1.js',
    'assets/mundo/data/puzzleZones2.js',
    'assets/mundo/data/puzzleZones3.js',
    'assets/mundo/data/tetrisZones.js',
    'assets/mundo/classes.js',
    'assets/mundo/index.js',
  ];

  constructor(private renderer: Renderer2) { }
  ngAfterViewInit(): void {
    console.log('OnInit: INICIO');

    const scriptGSAP = this.renderer.createElement('script');
    scriptGSAP.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    scriptGSAP.type = 'text/javascript';
    scriptGSAP.onload = () => { console.log(`Script GSAP loaded successfully.`); };
    scriptGSAP.onerror = (error: any) => { console.error(`Failed to load the script GSAP.`, error); };
    this.renderer.appendChild(document.body, scriptGSAP);


    this.scripts.forEach(src => this.loadScript(src));
    console.log('OnInit: FIN');
  }

  loadScript(src: string): void {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.onload = () => { console.log(`Script ${ src } loaded successfully.`); };
    script.onerror = (error: any) => { console.error(`Failed to load the script ${ src }.`, error); };
    this.renderer.appendChild(document.body, script);
  }

}
