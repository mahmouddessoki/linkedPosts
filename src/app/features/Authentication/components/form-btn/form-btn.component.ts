import { Component, input } from '@angular/core';
import { FormLoaderComponent } from '../form-loader/form-loader.component';

@Component({
  selector: 'form-btn',
  imports: [FormLoaderComponent],
  templateUrl: './form-btn.component.html',
  styleUrl: './form-btn.component.scss'
})
export class FormBtnComponent {

  isValid = input.required<boolean>()
  isLoading = input.required<boolean>()
  btnString = input.required<string>()

}
