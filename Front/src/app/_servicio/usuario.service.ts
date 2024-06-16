import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Usuario } from '../_modelo/usuario';
import { Nivel } from '../_modelo/nivel';
import { UsuarioResponse } from '../_modelo/usuarioResponse';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private url = 'http://localhost:8080/api/usuario';

  //Gestionamos el perfil del usuario
  private storageKey = 'userPerfil';

  setPerfil(usuario: UsuarioResponse) {
    sessionStorage.setItem(this.storageKey, JSON.stringify(usuario));
  }

  getPerfil(): UsuarioResponse {
    const profile = sessionStorage.getItem(this.storageKey);
    return profile ? JSON.parse(profile) : null;
  }

  clearPerfil() {
    sessionStorage.removeItem(this.storageKey);
    [1, 2, 3].forEach((puzzle) => sessionStorage.removeItem(`puzzle${puzzle}Completed`));
  }

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<UsuarioResponse> {
    console.log('Inicio LOGIN: username', username, 'password', password);
    return this.http.post<UsuarioResponse>(this.url + "/login", { username, password }).pipe(
      tap(response => {
        console.log('Login response', response);
      }),
      catchError(error => {
        console.log('Login error',error);
        throw new Error(error.error.message);
      })
    );
  }

  registro(usuario: any): Observable<UsuarioResponse> {
    console.log('usuario', usuario);

    return this.http.post<UsuarioResponse>(this.url + "/registro", usuario).pipe(
      tap(response => {
        console.log('Registro response', response);

      }),
      catchError(error => {
        console.log(error);
        throw new Error(error.error);

      })
    );
  }

  ranking(): Observable<UsuarioResponse[]> {
    console.log('Inicio de llamada Ranking');

    return this.http.get<UsuarioResponse[]>(this.url + "/ranking").pipe(
      tap(response => {
        console.log('Ranking response', response);

      }),
      catchError(error => {
        console.log(error);
        throw new Error(error.error);

      })
    );
  }

  updateUser(usuario: UsuarioResponse): Observable<UsuarioResponse> {
    console.log('Inicio UPDATE', usuario);
    return this.http.put<UsuarioResponse>(this.url + "/update", usuario).pipe(
      tap(response => {
        console.log('Update response', response);
      }),
      catchError(error => {
        console.log(error);
        throw new Error(error.error);
      })
    );
  }

  eliminarUsuario(username: string): Observable<any> {
    return this.http.delete(`${this.url}/borrar/${username}`)
  }

  getUsuarioAutenticado(): Observable<Usuario> {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('URL:', `${this.url}/usuarios/perfil`);
    return this.http.get<Usuario>(`${this.url}/usuarios/perfil`, { headers });
  }

  actualizarUsuario(idUsuario: number, usuario: Usuario): Observable<void> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<void>(`${this.url}/usuarios/perfil/${idUsuario}`, usuario, { headers });
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getNivelPorId(id: number): Observable<Nivel> {
    return this.http.get<Nivel>(`${this.url}/nivel/${id}`);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}/usuarios`);
  }

}
