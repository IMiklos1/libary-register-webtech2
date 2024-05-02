import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupDto } from '../models/auth';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  userForm: FormGroup;
  router = inject(Router);
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) {
    this.userForm = this.formBuilder.group<SignupDto>({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });
  }


  onSubmit() {
    if (this.userForm){
      const user: SignupDto = this.userForm.value;
      this.authService.signup(user).subscribe({
        next: (response) => {
          this.authService.setToken(response.accessToken);
          this.router.navigateByUrl('/');
          console.log("nana")
        }
      });
    }
  }
}
