import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = environment.apiURL;
  authToken : any;
  user: any;
  constructor(
    private httpClient: HttpClient,
  ) { }

  registerUser(user:any) {
    return this.httpClient.post(this.apiURL + "register", user);
  }
  authenticateUser(user:any) {
    return this.httpClient.post(this.apiURL + "authenticate", user);
  }
  storeUserData(token:any, user:any){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getProfile(){
    this.loadToken();
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .append('Authorization', this.authToken);

    return this.httpClient.get(this.apiURL + "profile", {headers:headers});
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    this.loadToken();
    if(this.authToken != null && this.authToken != undefined){
      return true;
    }else{return false;}
  }
  getUsername(user:any) {
    return this.httpClient.post(this.apiURL + "getUsername", user);
  }
}
