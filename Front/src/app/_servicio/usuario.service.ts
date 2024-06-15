import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Usuario } from '../_modelo/usuario';
import { Nivel } from '../_modelo/nivel';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private url = 'http://localhost:8080/api/usuario';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    console.log('Inicio LOGIN: username', username, 'password', password);
    return this.http.post<any>(this.url + "/login", { username, password }).pipe(
      tap(response => {
        console.log('Login response', response);
      }),
      catchError(error => {
        console.log(error);
        throw new Error(error.error);
      })
    );
  }

  registro(usuario: any): Observable<any> {
    console.log('usuario', usuario);

    return this.http.post<any>(this.url + "/registro", usuario).pipe(
      tap(response => {
        console.log('Registro response', response);

      }),
      catchError(error => {
        console.log(error);
        throw new Error(error.error);
      
      })
    );
  }

  eliminarUsuario(): Observable<void> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.url + "/usuarios/eliminar"}`, { headers });
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