import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable()
export class UserService {
    apiURL = environment.apiURL;

    constructor(
        private httpClient: HttpClient
    ) { }

    crearUsuario(usuario: any) {
        return this.httpClient.post(this.apiURL + "register", usuario);
    }

    editarUsuario(usuario: any) {
        return this.httpClient.post(this.apiURL + "editUser", usuario);
    }

    eliminarUsuario(usuario: any) {
        return this.httpClient.post(this.apiURL + "deleteUser", usuario);
    }

    obtenerUsuarios() {
        return this.httpClient.get(this.apiURL + "getUsers");
    }

    detalleUsuario(id: any) {
        return this.httpClient.get(this.apiURL + "usuario/ver/" + id);
    }

    obtenerCategorias() {
        return this.httpClient.get(this.apiURL + "usuario/categorias");
    }
}


