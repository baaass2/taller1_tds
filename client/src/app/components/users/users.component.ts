import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  ngOnInit(): void {
  }

  users: any;
  user: any = {
    "name": "",
    "username": "",
    "password": "",
    "email": "",
  };
  categorias: any;
  mensaje: any;
  editando = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.cargarUsuarios();
  }

  enviarFormulario() {
    this.userService.crearUsuario(this.user).subscribe(
      
      (data: any) => {
        console.log(data);
        this.mensaje = data.msg;
        this.cargarUsuarios();
        this.user = {
          "name": "",
          "username": "",
          "password": "",
          "email": "",
        };
      },
      (error: any) => {
        console.log(error);
        this.mensaje = error.msg;
      }
    )
  }

  cargarUsuarios() {
    this.userService.obtenerUsuarios().subscribe(
      (data: any) => {
        this.users = data.users;
      },
      (error: any) => {
        this.mensaje = error;
      }
    )
  }

  eliminarUsuario(user: any) {
    var alerta = confirm('El usuario sera eliminado y no se puede deshacer ¿Desea continuar?');
    if (alerta) {
      console.log(user);
      this.userService.eliminarUsuario(user).subscribe(
        (data: any) => {
          this.mensaje = data.mensaje;
          this.cargarUsuarios();
        },
        (error: any) => {
          this.mensaje = error;
        }
      )
    }
  }

  cargarUsuario(user: any) {
    this.editando = true;
    this.user = {
      "_id": user["_id"],
      "name": user["name"],
      "username": user["username"],
      "password": user["password"],
      "email": user["email"]
    };
  }

  editarUsuario(usuario: any) {
    this.userService.editarUsuario(usuario).subscribe(
      (data: any) => {
        this.mensaje = data.mensaje;
        this.cargarUsuarios();
        this.user = {
          "name": "",
          "username": "",
          "password": "",
          "email": "",
        };
        this.editando = false;
      },
      (error: any) => {
        this.mensaje = error;
      }
    )
  }

}
