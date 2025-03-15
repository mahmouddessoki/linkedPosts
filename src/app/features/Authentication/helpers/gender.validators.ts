import { AbstractControl, ValidationErrors } from '@angular/forms';

export function genderValidator(control: AbstractControl): ValidationErrors | null {
  const genderRegex = /^(male|female)$/;
  if (!control.value || genderRegex.test(control.value.toLowerCase())) {
    return null; // Valid gender
  }
  return { invalidGender: true }; // Invalid gender
}
