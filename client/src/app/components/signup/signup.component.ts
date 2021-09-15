import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/shared/services/user/User.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationValidators } from 'src/app/shared/services/validators/registration.validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  errors: any;
  privacyPolicyCheck: boolean = false;

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      RegistrationValidators.cannotContainSpace,
    ]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      RegistrationValidators.cannotContainSpace,
      RegistrationValidators.mustContainMonkey,
      RegistrationValidators.mustContainDot,
    ]),
    address: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      RegistrationValidators.cannotContainSpace,
    ]),
    telefon: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  // form getters
  get username() {
    return this.form.get('username');
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }
  get email() {
    return this.form.get('email');
  }

  get address() {
    return this.form.get('address');
  }

  get password() {
    return this.form.get('password');
  }

  get telefon() {
    return this.form.get('telefon');
  }

  loginRoute() {
    this.router.navigateByUrl('login');
  }

  createUser() {
    this.userService
      .createUserService({
        username: this.username?.value,
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        email: this.email?.value,
        address: this.address?.value,
        password: this.password?.value,
        telefon: this.telefon?.value,
      })
      .subscribe(
        (response: any) => {
          this.toastrService.success(response.msg);
          console.log(response);
          this.loginRoute();
        },
        (error: any) => {
          this.errors = error;
          if (this.errors) {
            console.log(this.errors.error.msg);
            this.toastrService.error(
              `${this.errors.error.msg}. Pokušajte s novim unosom`
            );
          }
        }
      );
  }
  checkCheckBoxvalue(event: any) {
    this.privacyPolicyCheck = event.target.checked;
    console.log('in');
  }

  change() {
    if (this.username?.errors?.minlength) {
      this.toastrService.info('Username mora biti duži od 6 karaktera.');
      return;
    }
    if (this.username?.errors?.cannotContainSpace) {
      this.toastrService.info('Username ne smije sadržavati prazan prostor.');
      return;
    }
    if (this.username?.touched && this.username?.invalid) {
      this.toastrService.info(
        'Username je obavezno polje. Molimo popunite polje'
      );
      return;
    }

    if (this.firstName?.touched && this.firstName?.invalid) {
      this.toastrService.info(
        'Licno ime je obavezno polje. Molimo popunite polje.'
      );
      return;
    }
    if (this.lastName?.touched && this.lastName?.invalid) {
      this.toastrService.info(
        'Prezime je obavezno polje. Molimo popunite polje.'
      );
      return;
    }
    if (this.address?.touched && this.address?.invalid) {
      this.toastrService.info(
        'Adresa je obavezno polje. Molimo popunite polje'
      );
      return;
    }

    if (this.email?.touched && this.email?.invalid) {
      if (this.email?.errors?.mustContainMonkey) {
        this.toastrService.info(
          'Email je mora sadrzavati @ simbol. Molimo popunite polje ili provjerite da li je unos odgovarajući'
        );
        return;
      }
      if (this.email?.errors?.mustContainDot) {
        this.toastrService.info(
          'Email je mora sadrzavati "." simbol. Molimo popunite polje ili provjerite da li je unos odgovarajući'
        );
        return;
      }
      this.toastrService.info(
        'Email je obavezno polje. Molimo popunite polje ili provjerite da li je unos odgovarajući'
      );
      return;
    }

    if (this.password?.touched && this.password?.invalid) {
      this.toastrService.info(
        'Password je obavezno polje. Molimo popunite polje ili provjerite da li je unos odgovarajući'
      );
      return;
    }
    if (this.password?.errors?.minlength) {
      this.toastrService.info('Password mora biti duži od 6 karaktera.');
      return;
    }
    if (this.password?.errors?.cannotContainSpace) {
      this.toastrService.info('Password ne smije sadržavati prazan prostor.');
      return;
    }
  }
}
