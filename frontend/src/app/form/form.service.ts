import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http:HttpClient) { }

  sendMail(user: any){
    return this.http.post('http://localhost:3000/api/sendmail', user);
  }

}
