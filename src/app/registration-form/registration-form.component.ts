import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})

export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  get email() { return this.registrationForm.get('email'); }
  get username() { return this.registrationForm.get('username'); }
  get password() { return this.registrationForm.get('password'); }

}
