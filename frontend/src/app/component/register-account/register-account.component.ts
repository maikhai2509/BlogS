import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_service/auth-service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_model/User';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonFunction } from 'src/app/utils/common-function';
import { ValidateInput } from '../../_model/validate-input.model';
import { SpinnerService } from 'src/app/_service/spinner.service';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.scss']
})
export class RegisterAccountComponent implements OnInit {

  user: User = new User();
  rePassword: string;

  error = {
    checkValidate: false,
    message: null
  }

  errorUsername = {
    checkValidate: false,
    message: null
  }

  validUsername: ValidateInput = new ValidateInput();
  // validFullname: ValidateInput = new ValidateInput();
  // validPhone: ValidateInput = new ValidateInput();
  // validEmail: ValidateInput = new ValidateInput();
  validPassword: ValidateInput = new ValidateInput();

  constructor(
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit() {

  }


  validateUsername() {
    this.validUsername = CommonFunction.validateInputUTF8Space(this.user.username, 50, null, true, true)
  }
  // validateFullname() {
  //   this.validFullname = CommonFunction.validateInput(this.user.fullname, 250, null)
  // }
  // validatePhone() {
  //   this.validPhone = CommonFunction.validateInput2(this.user.phone, true, 20, "(\\+84|0)([0-9]{9}|[0-9]{10})")
  // }
  // validateEmail() {
  //   this.validEmail = CommonFunction.validateInput(this.user.email, 250, /^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  // }

  validatePassword() {
    this.validPassword = CommonFunction.validateInput(this.rePassword, 20, null)
  }

  validateConfirmPassword() {
    if (this.user.password === undefined || this.user.password === "" || this.user.password === null) {
      this.error.checkValidate = true;
      this.error.message = 'Password không được để trống';
      return;
    }

    if (this.rePassword !== this.user.password) {
      this.error.checkValidate = true;
      this.error.message = 'Mật khẩu nhập lại không giống với mật khẩu đã nhập!';
      return;
    }

    this.error.checkValidate = false;
    this.error.message = ''
  }

  isLoading = false;
  registerAccount() {
    this.isLoading = true;
    this.validateConfirmPassword();

    this.user.username = CommonFunction.trimText(this.user.username)
    // this.user.fullname = CommonFunction.trimText(this.user.fullname)
    // this.user.phone = CommonFunction.trimText(this.user.phone)
    // this.user.email = CommonFunction.trimText(this.user.email)
    this.validUsername = CommonFunction.validateInputUTF8Space(this.user.username, 50, null, true, true)
    // this.validFullname = CommonFunction.validateInput(this.user.fullname, 250, null)
    // this.validPhone = CommonFunction.validateInput2(this.user.phone, true, 20, "(\\+84|0)([0-9]{9}|[0-9]{10})")
    // this.validEmail = CommonFunction.validateInput(this.user.email, 250, /^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    this.validPassword = CommonFunction.validateInput2(this.rePassword, true, 20, null)

    if (!this.validUsername.done || !this.validPassword.done) {
      return
    }

    if (this.error.checkValidate) {
      return;
    }

    if (this.rePassword != this.user.password) {
      this.toastr.warning('Mật khẩu nhập lại không giống với mật khẩu đã nhập!');
    } else {
      this.isLoading = true;
      this.user.roleId = '65e214ce0d74deffc762ac3d';
      this.authService.registerAccount(this.user).subscribe(
        (res: any) => {
          if (res.statuscode == 200) {
            this.isLoading = false;
            this.spinnerService.changeLoading(false);
            this.toastr.success('Đăng Ký Thành Công!');
            this.router.navigate(["login"]);
          }else{
            this.toastr.error(res.message);
          }
        },
        (error) => {

        }
      );
    }
  }

}
