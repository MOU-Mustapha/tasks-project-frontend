import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/user/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}
  getUserTasks(userId: string, param: any) {
    let params = new HttpParams();
    Object.entries(param).forEach(([key, value]: any) => {
      params = params.append(key, value);
    });
    return this.http.get(`${environment.baseUrl}/tasks/user-tasks/${userId}`, {
      params,
    });
  }
  changeTaskToComplete(model: object) {
    return this.http.put(`${environment.baseUrl}/tasks/complete`, model);
  }
  taskDetails(id: string) {
    return this.http.get(`${environment.baseUrl}/tasks/task/${id}`);
  }
}
