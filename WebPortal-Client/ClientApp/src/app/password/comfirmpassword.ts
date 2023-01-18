import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function Comfirmpassword (matchTo: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !!control.parent &&
      !!control.parent.value &&
      control.value === (control.parent?.controls as any)[matchTo].value
      ? null
      : { matching: true };
  };
}
