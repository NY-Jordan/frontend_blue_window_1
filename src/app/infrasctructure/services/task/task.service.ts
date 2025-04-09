import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../configurations/environment.dev';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }

    fetchTasks(): Observable<any> {
      return this.http.get(`${this.apiUrl}/task`, )
        .pipe(catchError(error => {
          throw error;
        }));
    }

    updateTask(taskId : number, data : {title : string, description : string , status_id?: number}): Observable<any> {
      return this.http.put(`${this.apiUrl}/task/update/${taskId}`, data, )
        .pipe(catchError(error => {
          throw error;
        }));
    }

    deleteTask(taskId : number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/task/delete/${taskId}`, )
        .pipe(catchError(error => {
          throw error;
        }));
    }

    createTask(task : { title : string, description : string }): Observable<any> {
      return this.http.post(`${this.apiUrl}/task/create`, task )
        .pipe(catchError(error => {
          throw error;
        }));
    }
}

