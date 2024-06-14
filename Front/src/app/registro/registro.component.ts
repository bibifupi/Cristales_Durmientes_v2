import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../_servicio/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {
  registro: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: UsuarioService,
    private router: Router
  ) {
    console.log("Construyendo")
    this.registro = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log("OnInit")
    console.log(this.registro.controls);
  }

  passwordCoincide(form: FormGroup) {
    return form.get("password")?.value === form.get("confirmarPassword")?.value;
  }

  onSubmit(): void {
    //si el formulario no es válido muestra alerta y no continua
    if (this.registro.invalid) { return alert('registro inválido'); }
    //si las constraseñas no coinciden muestra alerta y no continua
    if (!this.passwordCoincide(this.registro)) { return alert('Las contraseñas deben coincidir') }


    this.authService.registro(this.registro.value).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        if (err.status === 409)
          this.errorMessage = 'El usuario ya está en uso';
        else
          this.errorMessage = 'Error de servidor. Por favor, inténtalo de nuevo más tarde.';

        alert(this.errorMessage);
      }
    });
  }
}

