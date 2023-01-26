import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {validateEmail, validatePassword} from "../validation";
import {AuthenticationService} from "../services/authentication.service";
import {faEye, faEyeSlash, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {AlertHandlerService} from "../services/alert-handler.service";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})

export class RegistrationFormComponent implements OnInit {
  hidePassword: boolean = true;
  registrationForm!: FormGroup;
  public icons: IconDefinition[] = [faEyeSlash,faEye];

  constructor(private authenticationService: AuthenticationService,private alertHandler: AlertHandlerService) {

  }

  public ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, validateEmail()]),
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, validatePassword()])
    })
  }

  get email() { return this.registrationForm.get('email'); }
  get username() { return this.registrationForm.get('username'); }
  get password() { return this.registrationForm.get('password'); }

  public onSubmit(): void {
    let email: string = this.email?.value
    let username: string = this.username?.value
    let password: string = this.password?.value
    this.authenticationService.doRegistration(email, username, password).subscribe(
      registrationStatus => {
        if (registrationStatus === "ok") {
          this.alertHandler.resetOptions();
          this.alertHandler.addOption({name: "OK",callback: this.goToLogin})
          this.alertHandler.setCurrentDismissCallback(this.goToLogin);
          this.alertHandler.setCurrentCloseCallback(this.goToLogin);
          this.alertHandler.setAllValues("Registration","You've successfully registered! You can now log in",true);
        }
        else {
          if (registrationStatus === "emptyFields") {
            this.alertHandler.setAllValues("Registration","All fields are mandatory",true);
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

  public showPasswordRequirements(): void {
    this.alertHandler.setAllValues("Registration",'Password must contain at least:\n'+
      '- a lowercase character,\n' +
      '- an uppercase character,\n' +
      '- a special character,\n' +
      '- a digit\n' +
      'Password can\'t contain space and must be at least 8 characters long',true);
  }
  goToLogin(): void {
    window.open("http://localhost:8080/login", "_self");
  }
}
