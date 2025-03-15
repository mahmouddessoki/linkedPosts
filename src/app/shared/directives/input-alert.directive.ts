import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appInputAlert]'
})
export class InputAlertDirective {
  @Input() inputControl!: AbstractControl
  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {

    this.inputControl.valueChanges.subscribe({
      next: (val) => {
        if (this.inputControl.valid &&
          (this.inputControl.touched || this.inputControl.dirty)
        ) {
          this.el.nativeElement.classList.add("is-valid")
          this.el.nativeElement.classList.remove("is-invalid")
        } else if (!(this.inputControl.valid && (this.inputControl.touched || this.inputControl.dirty))) {
          this.el.nativeElement.classList.add("is-invalid")
          this.el.nativeElement.classList.remove("is-valid")

        }

      }
    })


  }



}
