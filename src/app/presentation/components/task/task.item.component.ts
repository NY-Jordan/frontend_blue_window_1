import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskIcons } from '../../pages/tasks/tasks.icons';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'task-item',
  templateUrl: './task.item.html',
  imports : [FontAwesomeModule, ReactiveFormsModule]
})
export class TaskItemComponent  {
  constructor() { }

  fa = TaskIcons
  isChecked = false;


}

