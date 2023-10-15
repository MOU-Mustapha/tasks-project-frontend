import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { signup } from '../../../models/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  'registerForm': FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.checkPassword }
    );
  }
  checkPassword(control: AbstractControl): ValidationErrors | null {
    let password = control.get('password')?.value;
    let confirmPassword = control.get('confirmPassword')?.value;
    if (password === confirmPassword) {
      return null;
    } else {
      return { notMatched: true };
    }
  }
  register() {
    const model: signup = {
      username: this.registerForm.value['username'],
      email: this.registerForm.value['email'],
      password: this.registerForm.value['password'],
      role: 'user',
    };
    this.authService.register(model).subscribe((res: any) => {
      this.toastr.success('Account Created Successfully');
      this.router.navigate(['/login'])
    });
  }
}
