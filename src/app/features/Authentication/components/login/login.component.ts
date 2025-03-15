import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidationMessagesComponent } from "../../../../shared/components/validation-messages/validation-messages.component";
import { validators } from '../../helpers/validators';
import { InputAlertDirective } from '../../../../shared/directives/input-alert.directive';

@Component({
  selector: 'app-login',
  imports: [ValidationMessagesComponent,
    ReactiveFormsModule,
    InputAlertDirective,
  RouterLink],
templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


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
        email: [null, validators.emailValidator],
        password:[null,validators.passwordValidate],
      })

    }


    login(){

      if(this.authForm.invalid || this.isLoading) {
        this.authForm.markAllAsTouched()
        this.authForm.get('password')!.setValue('')
      }

      this.isLoading = true;
      const userData = this.authForm.value
      this.authService.signIn(userData).subscribe({
        next:(res)=>{
          this.isLoading = false
          this.resMsg = res.message;
          this.authService.saveToken(res.token)
          this.authService.isLoggedIn.set(true)
          setTimeout(() => {
            this.router.navigate(['/timeline']);
          },1500)
        },
        error:(err)=>{
          this.resMsg = err.error.error.split(',')

          setTimeout(()=>{
            this.resMsg=''
          },2500)
          this.isLoading = false
        }
      })

    }

}
