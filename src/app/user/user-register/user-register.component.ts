import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserForRegister } from 'src/model/user';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerationForm: FormGroup;
  user: UserForRegister;
  userSubmitted: boolean;
  constructor(private fb: FormBuilder, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.createRegisterationForm();
  }

  createRegisterationForm() {
    this.registerationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.maxLength(10)]]
    }, { validators: this.passwordMatchingValidatior });
  }


  passwordMatchingValidatior(fg: FormGroup): Validators {
    return fg.get('password').value === fg.get('confirmPassword').value ? null : { notmatched: true };
  }

  get userName() {
    return this.registerationForm.get('userName') as FormControl;
  }

  get email() {
    return this.registerationForm.get('email') as FormControl;
  }
  get password() {
    return this.registerationForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.registerationForm.get('confirmPassword') as FormControl;
  }
  get mobile() {
    return this.registerationForm.get('mobile') as FormControl;
  }

  onReset() {
    this.userSubmitted = false;
    this.registerationForm.reset();
  }
  userData(): UserForRegister {
    return this.user = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value
    };
  }



  onSubmit() {
    console.log(this.registerationForm.value);
    this.userSubmitted = true;

    if (this.registerationForm.valid) {

      this.authService.registerUser(this.userData()).subscribe(() => {
        this.onReset();
        this.alertify.success('Congrats, you are successfully registered');
      });
    }
  }



}
