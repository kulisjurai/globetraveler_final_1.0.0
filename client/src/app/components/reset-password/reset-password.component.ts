import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegistrationValidators } from 'src/app/shared/services/validators/registration.validators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user/User.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  validForm: any;
  username: any;

  constructor(
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  resetingForm = new FormGroup({
    password1: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      RegistrationValidators.cannotContainSpace,
    ]),
    password2: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      RegistrationValidators.cannotContainSpace,
    ]),
  });

  get password1() {
    return this.resetingForm.get('password1');
  }

  get password2() {
    return this.resetingForm.get('password2');
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (!params.username) {
        this.toastrService.error('Link for reset password is not valid.');
        this.router.navigateByUrl('/login');
      } else {
        this.username = params.username;
        console.log(this.username);
      }
    });
  }

  validationCheck() {
    if (this.password1?.errors?.minlength) {
      this.toastrService.info('Password mora biti duži od 6 karaktera.');
      return;
    }
    if (this.password1?.errors?.canContainSpace) {
      this.toastrService.info('Password ne smije sadržavati prazan prostor.');
      return;
    }
    if (this.password2?.errors?.minlength) {
      this.toastrService.info('Password mora biti duži od 6 karaktera.');
      return;
    }
    if (this.password2?.errors?.cannotContainSpace) {
      this.toastrService.info('Password ne smije sadržavati prazan prostor.');
      return;
    }
    this.validForm = true;
  }

  checkIfMatch() {
    if (this.password1?.value != this.password2?.value) {
      this.toastrService.info(
        'Lozinke se ne podudaraju, porvjerite još jednom svoj unos'
      );
      return false;
    }
    return true;
  }

  resetPassword() {
    if (this.checkIfMatch()) {
      this.userService
        .resetPassword({
          password: this.password1?.value,
          username: this.username,
        })
        .subscribe((result: any) => {
          this.toastrService.success(result.msg);
          this.router.navigateByUrl('login');
        });
    }
  }
}
