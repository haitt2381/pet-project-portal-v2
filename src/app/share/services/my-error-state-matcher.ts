import {ErrorStateMatcher} from "@angular/material/core";
import {AbstractControl, FormGroup, FormGroupDirective, NgForm} from "@angular/forms";

export class MyErrorStateMatcher implements ErrorStateMatcher {

  constructor(private form: FormGroup) {
  }
  isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form?.submitted;
    return !!(control?.invalid && (control.dirty || control.touched || isSubmitted));
  }

  isRequired(fieldName: string) {
    const control = this.form.controls[fieldName];
    return (control.dirty || control.touched) && control.hasError('required');
  }

}
