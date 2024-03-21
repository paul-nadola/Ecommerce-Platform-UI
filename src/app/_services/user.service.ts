import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = "http://localhost:9090";

  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );

  constructor(
    private httpClient: HttpClient,
  ) { }

  public login(loginData: NgForm){

    return this.httpClient.post(
      this.PATH_OF_API+ "/authenticate", loginData,{headers: this.requestHeader
      })
  }
}
