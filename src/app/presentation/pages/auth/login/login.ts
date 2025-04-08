import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  templateUrl: './login.html',
  imports: [CommonModule],

})
export class LoginPage {
  title = 'Login';
}
