import { AbstractControl, ValidationErrors } from "@angular/forms";

export const dateValidator = (control: AbstractControl): ValidationErrors | null => {
  const inputValue = control.value;
  if (!inputValue) return null;

  const inputDate = new Date(inputValue);
  const minDate = new Date('1970-01-01');
  const today = new Date();

  // Normalize time for accurate date-only comparison
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (inputDate.getFullYear() < minDate.getFullYear() || inputDate.getFullYear() >= today.getFullYear()-10) {
    return { unRealistic: true };
  }

  return null;
}
