import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/user/src/environments/environment';
import { login, signup } from '../../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(model: login) {
    return this.http.post(`${environment.baseUrl}/auth/login`, model);
  }
  register(model: signup) {
    return this.http.post(`${environment.baseUrl}/auth/createAccount`, model);
  }
}
