import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user/User.service';
import { User } from 'src/app/models/User.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationValidators } from 'src/app/shared/services/validators/registration.validators';
import { DataService } from 'src/app/shared/services/common/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User = {};
  isLoginActive: any = false;
  errors: any;

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      RegistrationValidators.cannotContainSpace,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      RegistrationValidators.cannotContainSpace,
    ]),
  });

  constructor(
    private router: Router,
    public userService: UserService,
    private toastrService: ToastrService,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.data.loginStatus.subscribe((status) => {
      this.isLoginActive = status;
    });
  }

  signUpRoute() {
    this.router.navigateByUrl('signup');
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  loginUser() {
    this.userService
      .loginUserService(this.username?.value, this.password?.value)
      .subscribe(
        (response: any) => {
          this.toastrService.success(
            'Uspješno ste prijavljeni. Globetraveler Vam želi sretno putovanje!'
          );
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.setLoginStatus(response.token);
          this.router.navigateByUrl('home');
        },
        (error: any) => {
          this.errors = error;

          if (this.errors) {
            console.log(this.errors.error.msg);
            this.toastrService.error(this.errors.error.msg);
          }
        }
      );
  }
  setLoginStatus(token: any) {
    if (token) this.data.updateLoginStatus(true);
  }
}
