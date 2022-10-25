import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;

  message:any;

  constructor(
    private authService: AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(
      (data:any) => {
        console.log(data.msg);
        if(data.success == true){
          this.message = data.msg;
          this.authService.storeUserData(data.token, data.user);
          this.router.navigate(['profile']);
        } else {
          this.message = data.msg;
        }
        
    });
  }

}
