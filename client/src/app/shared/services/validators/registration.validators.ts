import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export class RegistrationValidators {
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    }
    return null;
  }

  static mustContainMonkey(control: AbstractControl): Validators | null {
    if ((control.value as string).indexOf('@') < 0) {
      return { mustContainMonkey: true };
    }
    return null;
  }

  static mustContainDot(control: AbstractControl): Validators | null {
    if ((control.value as string).indexOf('.') < 0) {
      return { mustContainDot: true };
    }
    return null;
  }
}
