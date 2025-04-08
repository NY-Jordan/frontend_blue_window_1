import { faPlus } from './../../../../../node_modules/@fortawesome/free-solid-svg-icons/faPlus.d';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { TaskIcons } from './tasks.icons';
import { TaskItemComponent } from "../../components/task/task.item.component";

@Component({
  templateUrl: './tasks.html',
  imports: [CommonModule, FontAwesomeModule, TaskItemComponent],
})

export class TaskPage {
  title = 'Tasks';
  currentDate : Date = new Date()
  fa = TaskIcons
}
