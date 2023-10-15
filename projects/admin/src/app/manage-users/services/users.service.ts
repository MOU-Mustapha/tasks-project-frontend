import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/user/src/environments/environment';
import { changeUserStatus } from '../../models/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userData: BehaviorSubject<any> = new BehaviorSubject({});
  constructor(private http: HttpClient) {}
  getAllUsers(filtration: any) {
    let params = new HttpParams();
    if (filtration) {
      Object.entries(filtration).forEach(([key, value]: any) => {
        params = params.append(key, value);
      });
    }
    return this.http.get(`${environment.baseUrl}/auth/users`, { params });
  }
  deleteUser(userId: string) {
    return this.http.delete(`${environment.baseUrl}/auth/user/${userId}`);
  }
  changeUserStatus(model: changeUserStatus) {
    return this.http.put(`${environment.baseUrl}/auth/user-status`, model);
  }
  getUsers(filtration?: any) {
    this.getAllUsers(filtration).subscribe((res: any) => {
      this.userData.next({
        data: res.users,
        total: res.totalItems,
      });
    });
  }
}
