import { AbstractControl } from "@angular/forms"

export const confirmPassword = (controls: AbstractControl)=> {
  return controls.get('password')?.value === controls.get('rePassword')?.value
    ? null : { mismatch: true }

}
