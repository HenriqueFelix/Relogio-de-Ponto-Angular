import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../constantes/app-constants';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarioList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUsuarios);
  }

  getUsuarioId(id: number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUsuarios + "" + id);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete<any>(AppConstants.baseUsuarios + "" + id);
  }

  consultarUsuario(query: string): Observable<any> {
    return this.http.get<any>(AppConstants.baseUsuarios + "usuarioPorNome/" + query);
  }

  cadastrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(AppConstants.baseUsuarios, usuario);
  }

  editarUsuario(usuario: Usuario): Observable<any> {
    return this.http.put<any>(AppConstants.baseUsuarios, usuario);
  }

  usuarioAutenticado() {
    if (AppConstants.verificarVariavel(localStorage.getItem("token")) && localStorage.getItem("token").toString().trim() != "") {
      return true;
    } else {
      return false;
    }
  }
  
  deleteContato(id: number): Observable<any> {
    return this.http.delete<any>(AppConstants.baseContato + "" + id);
  }
}
