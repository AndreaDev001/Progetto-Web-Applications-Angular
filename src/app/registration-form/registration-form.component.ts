import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {validateEmail, validatePassword} from "../validation";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})

export class RegistrationFormComponent implements OnInit {
  hidePassword: boolean = true;
  registrationForm!: FormGroup;

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

}
