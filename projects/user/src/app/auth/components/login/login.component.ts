import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  'loginForm': FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      role: ['user'],
    });
  }
  login() {
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      localStorage.setItem('token', JSON.stringify(res.token));
      localStorage.setItem('userId', JSON.stringify(res.userId));
      this.toastr.success('Logged In Successfully');
      this.router.navigate(['/tasks']);
    });
  }
}
