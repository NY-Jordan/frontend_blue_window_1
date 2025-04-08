import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  templateUrl: './register.html',
  imports: [CommonModule],

})
export class RegisterPage {
  title = 'Register';
}
