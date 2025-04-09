import { faPlus } from './../../../../../node_modules/@fortawesome/free-solid-svg-icons/faPlus.d';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { TaskIcons } from './tasks.icons';
import { TaskItemComponent } from "../../components/task/task.item.component";
import { AuthService } from '../../../infrasctructure/services/auth/auth.service';
import { Store, StoreModule } from '@ngrx/store';
import { taskReducer } from '../../../store/reducers/task.reducer';
import { Observable } from 'rxjs';
import { IPagination, ITask } from '../../../domain/entities/task.entities';
import { AppState } from '../../../store/state';
import { TaskService } from '../../../infrasctructure/services/task/task.service';
import { loadTasksSuccess } from '../../../store/actions/task.actions';
import { NameComponent } from "../../components/createTask/create.task";

@Component({
  templateUrl: './tasks.html',
  imports: [CommonModule, FontAwesomeModule, TaskItemComponent, NameComponent],
})

export class TaskPage {

  currentDate : Date = new Date()
  fa = TaskIcons
  tasks$: Observable<ITask[]>;
  pagination$: Observable<IPagination>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  createModalIsVisible = false

  constructor(
    private authService :  AuthService,
    private router : Router,
    private store: Store<AppState>,
    private taskService :  TaskService) {

    this.tasks$ = this.store.select((state : AppState) => state.task.tasks);
    this.loading$ = this.store.select((state) => state.task.loading);
    this.error$ = this.store.select((state) => state.task.error);
    this.pagination$ = this.store.select((state) => state.task.pagination);

  }



  openCreateTaskModal() {
    this.createModalIsVisible = true;
  }

  closeCreateTaskModal() {
    console.log('ici');
    this.createModalIsVisible = false;
  }




  ngOnInit() {
    this.taskService.fetchTasks().subscribe({
      next : (response) => {
        console.log(response)
        this.store.dispatch(loadTasksSuccess({ tasks: response.data, pagination : response.pagination }))
      }
    })
  }

  logout () {
    this.authService.logout()
    this.router.navigate(['auth/login']);
  }
}
