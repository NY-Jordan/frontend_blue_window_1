import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule, RouterOutlet,  } from '@angular/router';
import { AuthService } from '../../../../infrasctructure/services/auth/auth.service';
import { Iuser } from '../../../../domain/entities/user.entities';
import { response } from 'express';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface IRegisterForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword : FormControl<string>
}


@Component({
  templateUrl: './register.html',
  standalone : true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],

})
export class RegisterPage {

  registerForm: FormGroup<IRegisterForm>;
  loading = false;
  emailExist = false;

  constructor(private formBuilder: FormBuilder, private authService :  AuthService, private http : HttpClient, private router: Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordContainsNumber]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordsMatch('password', 'confirmPassword')
    });
  }

  private passwordContainsNumber(control: AbstractControl): ValidationErrors | null {
    const hasNumber = /\d/.test(control.value);
    return hasNumber ? null : { passwordNoNumber: true };
  }

  private passwordsMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordsMatch']) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordsMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    this.loading = true;
    this.emailExist = false
    if (this.registerForm.invalid) {return;}

    const user : Iuser  = {
      name : this.registerForm.value.name ?? '',
      email : this.registerForm.value.email ?? '',
      password : this.registerForm.value.password ?? '',
    }
    this.authService.register(user).subscribe( {
      next : (response) => {
          this.loading = false;
          const token  = response.token;
          if (token) {
            this.authService.setToken(token);
            this.router.navigate(['dashboard'])
          }
      },
      error  : (err) => {
        if (err.status === 409) {
          console.log('set')
          this.emailExist = true;
        }
      }


    })

  }

}
