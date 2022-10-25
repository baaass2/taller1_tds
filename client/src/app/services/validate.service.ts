import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user:any){
    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined ){
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email:any){
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email); 
  }
}
