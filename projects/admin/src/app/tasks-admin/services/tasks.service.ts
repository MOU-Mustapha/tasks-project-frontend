import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}
  // getAllUsers() {
  //   return this.http.get(`${environment.baseUrl}/auth/users`);
  // }
  getAllTasks(filtration: any) {
    let params = new HttpParams();
    Object.entries(filtration).forEach(([key, value]: any) => {
      if (value) {
        params = params.append(key, value);
      }
    });
    return this.http.get(`${environment.baseUrl}/tasks/all-tasks`, { params });
  }
  createNewTask(model: any) {
    return this.http.post(`${environment.baseUrl}/tasks/add-task`, model);
  }
  deleteTask(id: number) {
    return this.http.delete(`${environment.baseUrl}/tasks/delete-task/${id}`);
  }
  updateTask(model: any, id: number) {
    return this.http.put(`${environment.baseUrl}/tasks/edit-task/${id}`, model);
  }
}
