import { Validators } from "@angular/forms";
import { dateValidator } from "./dateValidators";
import { emailValidator } from "./email.validate";
import { genderValidator } from "./gender.validators";

export const validators = {
  nameValidator:[Validators.required , Validators.minLength(3) , Validators.maxLength(20)],
  emailValidator: [Validators.required,emailValidator],
  passwordValidate: [Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)],
  dateOfBirth: [dateValidator],
  genderValidator: [genderValidator,Validators.required]
}
