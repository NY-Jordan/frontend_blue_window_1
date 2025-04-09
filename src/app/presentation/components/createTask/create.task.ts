import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../../infrasctructure/services/task/task.service';
import { Store } from '@ngrx/store';
import { addTaskSuccess } from '../../../store/actions/task.actions';


interface ICreateTaskForm {
  title : FormControl<string|null>,
  description : FormControl<string|null>
}

@Component({
  selector: 'create-task',
  templateUrl: './create.task.html',
  imports : [ReactiveFormsModule , CommonModule, RouterModule]
})


export class NameComponent implements OnInit {
  @Input() active!: boolean;
  @Input() closeCreateTaskModal! : () => void
  createTaskForm: FormGroup<ICreateTaskForm>;

  constructor(private formBuilder : FormBuilder, private taskService  : TaskService, private store : Store) {
    this.createTaskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
   }

   closeModal () {
      this.active = false;
      this.closeCreateTaskModal();
   }

   get f() { return this.createTaskForm.controls; }

   onSubmit () {
    if (this.createTaskForm.invalid) {return;}
    this.taskService.createTask({
      title : this.createTaskForm.value.title ?? '',
      description : this.createTaskForm.value.description ?? ''
    }).subscribe({
      next : (response)  => {
        console.log(response);
        this.store.dispatch(addTaskSuccess({task : response.task}))
        this.closeModal();
      }
    })
   }
  ngOnInit(): void { }
}

