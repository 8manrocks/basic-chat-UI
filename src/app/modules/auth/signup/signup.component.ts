import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { User } from 'src/models/auth/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  }) as FormGroupTyped<User>;
  confPassword = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.verifyPasswords();
  }

  verifyPasswords() {
    merge(this.signUpForm.controls.password.valueChanges, this.confPassword.valueChanges).subscribe(val => {
      if ((this.signUpForm.controls.password.value !== this.confPassword.value) && ((val === this.signUpForm.controls.password.value) || (val === this.confPassword.value))) {
        this.signUpForm.controls.password.setErrors({notConfirmed: true});
      } else {
        this.signUpForm.controls.password.setErrors(null);
      }
    });
  }

}
