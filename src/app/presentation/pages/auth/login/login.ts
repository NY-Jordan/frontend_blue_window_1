import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../infrasctructure/services/auth/auth.service';

interface ILoginForm {
  email: FormControl<string|null>;
  password: FormControl<string|null>;
}
@Component({
  templateUrl: './login.html',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],

})
export class LoginPage {
  loading = false;
  falseCredential  = false
  loginForm: FormGroup<ILoginForm>;

  constructor(private formBuilder: FormBuilder,private cdr: ChangeDetectorRef, private authService :  AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

  }

  get f() { return this.loginForm.controls; }


  onSubmit(): void {
    this.loading = true;
    this.falseCredential = false;
    if (this.loginForm.invalid) {return;}


    this.authService.login(this.loginForm.value.email ?? '', this.loginForm.value.password ?? '').subscribe( {
      next : (response : any) => {
          this.loading = false;
          const token  = response.token;
          if (token) {
            this.authService.setToken(token);
            this.router.navigate(['dashboard'])
          }
      },
      error  : (err) => {
          console.log('set')
          this.falseCredential = true;
          this.cdr.detectChanges();
          console.log(this.falseCredential)
      }
    })

  }

}
