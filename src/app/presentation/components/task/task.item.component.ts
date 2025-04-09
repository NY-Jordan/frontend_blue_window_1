import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskIcons } from '../../pages/tasks/tasks.icons';
import { ReactiveFormsModule } from '@angular/forms';
import { ITask } from '../../../domain/entities/task.entities';
import { Observable } from 'rxjs';
import { taskStatusEnum } from '../../../domain/enum/statusEnum';
import { TaskService } from '../../../infrasctructure/services/task/task.service';
import { Store } from '@ngrx/store';
import { deleteTaskSuccess, updateTaskSuccess } from '../../../store/actions/task.actions';
import { ToastrService } from 'ngx-toastr';
import { NameComponent } from "../viewTask/task.view.component";

@Component({
  selector: 'task-item',
  templateUrl: './task.item.html',
  imports: [FontAwesomeModule, ReactiveFormsModule, NameComponent]
})
export class TaskItemComponent  {
  @Input() task!: ITask;
  constructor(private taskService : TaskService, private store : Store, private toastr: ToastrService) {}
  fa = TaskIcons
  isChecked = false;
  status = taskStatusEnum
  viewTaskModalIsVisible = false;

  changeStatus  = () => {
    console.log(this.task.status_id === this.status.in_progress);

    const newStatus  = this.task.status_id === this.status.in_progress? this.status.completed : this.status.in_progress
    this.taskService.updateTask(this.task.id, {
      title : this.task.title,
      description : this.task.description,
      status_id :  newStatus,
    }).subscribe({
      next : () => {
        this.store.dispatch(updateTaskSuccess({task : {...this.task, status_id : newStatus}, }));
        this.toastr.success('successful operation !', 'Succès');
      }
    })
  }

  deleteTask  = () => {
    this.taskService.deleteTask(this.task.id).subscribe({
      next : () => {
        this.store.dispatch(deleteTaskSuccess({id : this.task.id}));
        this.toastr.success('successful operation !', 'Succès');

      }
    })
  }

  openViewTaskModal() {
    this.viewTaskModalIsVisible = true;
  }



}

