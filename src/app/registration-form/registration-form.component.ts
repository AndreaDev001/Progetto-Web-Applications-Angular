import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {validateEmail, validatePassword} from "../validation";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})

export class RegistrationFormComponent implements OnInit {
  hidePassword: boolean = true;
  registrationForm!: FormGroup;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, validateEmail()]),
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, validatePassword()])
    })
  }

  get email() { return this.registrationForm.get('email'); }
  get username() { return this.registrationForm.get('username'); }
  get password() { return this.registrationForm.get('password'); }

  onSubmit() {
    var email: string = this.email?.value
    var username: string = this.username?.value
    var password: string = this.password?.value
    this.authenticationService.doRegistration(email, username, password).subscribe(
      registrationStatus => {
        if (registrationStatus === "ok") {
          alert("You've successfully registered! You can now log in")
          window.open("http://localhost:8080/login", "_self");
        }
        else {
          if (registrationStatus === "emptyFields") {
            alert("All fields are mandatory")
          }
          if (registrationStatus === "unavailableUsername") {
            this.registrationForm.controls['username'].setErrors({'unavailable' : true});
          }
          if (registrationStatus === "invalidUsername") {
            this.registrationForm.controls['username'].setErrors({'minlength': true, 'maxlength' : true});
          }
          if (registrationStatus === "unavailableEmail") {
            this.registrationForm.controls['email'].setErrors({'unavailable' : true});
          }
          if (registrationStatus === "invalidEmail") {
            this.registrationForm.controls['email'].setErrors({'emailRequirements' : true});
          }
          if (registrationStatus === "invalidPassword") {
            this.registrationForm.controls['password'].setErrors({'passwordRequirements' : true});
          }
        }
      }
    )
  }

  showPasswordRequirements(): void {
    alert('Password must contain at least:\n'+
      '- a lowercase character,\n' +
      '- an uppercase character,\n' +
      '- a special character,\n' +
      '- a digit\n' +
      'Password can\'t contain space and must be at least 8 characters long');
  }

  goToLogin(): void {
    window.open("http://localhost:8080/login", "_self");
  }
}
