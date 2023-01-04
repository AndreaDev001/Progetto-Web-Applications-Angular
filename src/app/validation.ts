import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validatePassword(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const lowercaseExpression: RegExp = /[a-z]/;
    const uppercaseExpression: RegExp = /[A-Z]/;
    const digitExpression: RegExp = /\d/;
    const specialCharExpression: RegExp = /[^\d\s\w]/;
    if (control.value.length < 8 ||
      control.value.indexOf(' ') != -1 ||
      !lowercaseExpression.test(control.value) ||
      !uppercaseExpression.test(control.value) ||
      !digitExpression.test(control.value) ||
      !specialCharExpression.test(control.value)) {
      return {passwordRequirements : true};
    }
    return null;
  }
}


export function validateEmail(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const expression: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,7}$/;
    if (control.value != null && !expression.test(control.value)) {
      return {emailRequirements : true};
    }
    return null;
  }
}
