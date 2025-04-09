import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../../../domain/entities/task.entities';

@Component({
  selector: 'view-task',
  templateUrl: './task.view.html',
})
export class NameComponent implements OnInit {
  @Input() task!: ITask;
  @Input() active!: boolean;

  closeModal ()  {
    this.active = false
  }

  constructor() { }

  ngOnInit(): void { }
}

