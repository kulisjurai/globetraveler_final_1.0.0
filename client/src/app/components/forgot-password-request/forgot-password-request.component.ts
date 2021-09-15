import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user/User.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password-request.component.html',
  styleUrls: ['./forgot-password-request.component.scss'],
})
export class ForgotPasswordRequestComponent implements OnInit {
  myGroup: any;
  errors: any;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  identifierForm = new FormGroup({
    identifier: new FormControl(),
  });

  get identifier() {
    return this.identifierForm.get('identifier');
  }
  ngOnInit(): void {}

  sendRequest() {
    this.userService.checkIfUserExist(this.identifier?.value).subscribe(
      (result) => {
        this.toastrService.info(
          'Link za obnovu vašeg računa poslan je na Vašu email adresu'
        );
      },
      (error: any) => {
        this.errors = error;

        if (this.errors) {
          console.log(this.errors.error.msg);
          this.toastrService.error(
            'Ne postoji korisnik sa unešenim username-om il email-om'
          );
        }
      }
    );
  }
  dispatchToSigUp() {
    this.router.navigateByUrl('signup');
  }
}
