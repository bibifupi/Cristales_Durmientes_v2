import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../_servicio/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    console.log("Construyendo")
    this.login = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    //si el formulario no es válido muestra alerta y no continua
    if (this.login.invalid) { return alert('Login inválido'); }

    const { username, password } = this.login.value;

    this.usuarioService.login(username, password).subscribe({
      next: () => this.router.navigate(['/perfil']),
      error: (err) => {
        console.log(err);
        this.errorMessage = err.toString();
   
         alert(this.errorMessage);
       }
    });
  }

}
