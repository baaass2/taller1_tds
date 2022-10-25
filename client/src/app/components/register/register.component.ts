import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: any;
  username: any;
  password: any;
  email: any;

  message: any;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(){
    console.log(this.name);

    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    if(!this.validateService.validateRegister(user)){
      console.log('Faltan campos por llenar');
      this.message = 'Faltan campos por llenar';
      return this.message;
    }
    if(!this.validateService.validateEmail(user.email)){
      console.log('Correo invalido');
      this.message = 'Correo invalido';
      return this.message;
    }

    this.authService.getUsername(user).subscribe(
      (data:any) => {
        console.log(data);
        if(data.success == false){
          this.message = data.msg;
          return this.message;  
        }else{
          this.authService.registerUser(user).subscribe(data => {
            if(data){
              this.message = 'Se ha registrado el usuario con exito!';
              console.log(this.message);
              this.router.navigate(['login']);
            } else {
              this.message = 'Hubo un error :(';
              console.log(this.message);
            }
          });
        }
    });
  }
}
