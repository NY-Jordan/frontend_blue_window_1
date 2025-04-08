import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskIcons } from '../../pages/tasks/tasks.icons';

@Component({
  selector: 'task-item',
  templateUrl: './task.item.html',
  imports : [FontAwesomeModule]
})
export class TaskItemComponent  {
  constructor() { }

  fa = TaskIcons
  isChecked = false;


}

