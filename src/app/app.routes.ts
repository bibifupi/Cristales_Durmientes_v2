import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
    { path: 'login', title: 'Login', component: LoginComponent },
    { path: 'registro',  title: 'Registro',component: RegistroComponent },
    { path: 'perfil',  title: 'Perfil', component: PerfilComponent },
    { path: '',  redirectTo:'login', pathMatch:'full' },
    { path: '**',  title: 'No se ha encontrado la página', component: ErrorComponent }
];
