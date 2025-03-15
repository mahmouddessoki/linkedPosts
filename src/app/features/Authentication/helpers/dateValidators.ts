import { AbstractControl, ValidationErrors } from "@angular/forms";

export const dateValidator = (control: AbstractControl): ValidationErrors | null => {
  // const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  // if (!control.value || !regex.test(control.value)) {
  //   return { invalidDate: true }; // Invalid format
  // }
  // Parse the date
  const [day, month, year] = control.value.split('/').map(Number);
  const inputDate = new Date(year, month - 1, day);
  const today = new Date();

  // Check if the date is realistic (not in the future & reasonable age)
  if (inputDate > today || year < 1900) {
    return { unrealisticDate: true };
  }
  return null; // Valid date

}
