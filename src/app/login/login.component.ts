import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { LoginDTO } from '../models/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userService = inject(AuthService);
  authService = inject(AuthService);
  router = inject(Router);
  // toastrService = inject(ToastrService);
  loginForm: FormGroup;
  constructor(private formBuilder:FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: "",
      password: ""
    });

  }
  login() {
    const loginData = this.loginForm.value as LoginDTO;

    this.userService.login(loginData).subscribe({
      next: (response) => {
        this.authService.setToken(response.accessToken);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        // this.toastrService.error(err.error.error, 'Error');
      }
    });
  }
}