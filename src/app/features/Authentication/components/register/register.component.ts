import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { validators } from '../../helpers/validators';
import { AuthService } from '../../services/auth.service';
import { confirmPassword } from '../../helpers/confirmPass';
import { ValidationMessagesComponent } from "../../../../shared/components/validation-messages/validation-messages.component";
import { InputAlertDirective } from '../../../../shared/directives/input-alert.directive';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBtnComponent } from "../form-btn/form-btn.component";
import { ResMsgComponent } from "../res-msg/res-msg.component";
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,
    ValidationMessagesComponent,
    InputAlertDirective,
    RouterLink,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, FormBtnComponent, ResMsgComponent],
  providers: [provideNativeDateAdapter()],

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  authForm!: FormGroup;
  isLoading:boolean = false;
  resMsg!:string;
  ngOnInit(){
    this.createForm()
  }

  createForm() {
    this.authForm = this.fb.group({
      name: [null, validators.nameValidator],
      email: [null, validators.emailValidator],
      password:[null,validators.passwordValidate],
      rePassword: [null],
      dateOfBirth: [null, validators.dateOfBirth],
      gender: [null, validators.genderValidator]
    }, { validators: [confirmPassword] })

  }


  register(){
    if(this.authForm.invalid || this.isLoading) {
      this.authForm.markAllAsTouched()
      this.authForm.get('password')!.setValue('')
    }

    this.isLoading = true;
    const userData = this.authForm.value
    this.authService.signUp(userData).subscribe({
      next:(res)=>{
        this.isLoading = false
        this.resMsg = res.message;

        setTimeout(() => {
          this.router.navigate(['/login']);
        },1500)
      },
      error:(err)=>{
        this.resMsg = err.error.error
        this.isLoading = false
      }
    })

  }






}
