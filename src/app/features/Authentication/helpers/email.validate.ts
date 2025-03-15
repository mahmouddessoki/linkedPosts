import { AbstractControl, ValidationErrors } from "@angular/forms";

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!control.value || emailRegex.test(control.value)) {
    return null; // Valid email
  }

  return { invalidEmail: true }; // Invalid email
}
