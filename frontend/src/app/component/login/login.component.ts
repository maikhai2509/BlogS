import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/_service/auth-service/authentication.service';
import { SpinnerService } from 'src/app/_service/spinner.service';
import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  roles: string[] = [];
  public user: any = {};

  loginValidate = this.formG.group({
    "userName":["",Validators.required],
    "password":["",Validators.required]
  });

  constructor(
    private tokenStorage: TokenStorageService,
    private auth: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    private formG: FormBuilder,
    private spinnerService: SpinnerService
  ) { 

  }

  ngOnInit() {
    this.user = {
      username: '',
      password: '',
    };
  }

  isLoading = false;
  submitForm(): void {
    this.isLoading = true;
    sessionStorage.removeItem('role');
    this.spinnerService.changeLoading(true);
    this.auth.login(this.user).subscribe((data) => {
      if (data.statuscode == 200) {
          this.isLoading = false;

          const accessToken = data?.data?.accesstoken;

          // Phần header của JWT
          const base64UrlHeader = accessToken.split('.')[0];
          const header = JSON.parse(atob(base64UrlHeader));

          // Phần payload của JWT
          const base64UrlPayload = accessToken.split('.')[1];
          const payload = JSON.parse(atob(base64UrlPayload));

          // Thông tin giải mã
          console.log("Header:", header);
          console.log("Payload:", payload);
          this.tokenStorage.saveUser(payload?.username);


          this.spinnerService.changeLoading(false);
          this.tokenStorage.saveToken(data?.data?.accesstoken);
          this.tokenStorage.saveRole(data?.data?.role?.roleName);
          // this.tokenStorage.saveUser(data.data.username);
          // this.tokenStorage.saveUser_id(data.data.id);
          // this.tokenStorage.saveFullName(data.data.fullname);

          // this.storageSessionService.set('role',data.data.roleDto);
          // sessionStorage.setItem(environment.authTokenKey, data.data.token);
          // sessionStorage.setItem('functionCode',data.data.roleDto.functionCode);

          // const role = data.data.role;
          // this.tokenStorage.saveRole(role);
          // console.log(role);
          // console.log(this.tokenStorage.getUserRole());
          // Giải mã token

        
          // this.tokenStorage.saveFullName(payload.fullname);

          this.toastr.success('Đăng nhập thành công');

          // if(data.data.role.roleName === "admin"){
          this.router.navigate(['/home/list-posts']);
          // }else{
          //   this.router.navigate(['/home/list-posts']);
          // }
          var roleName = this.tokenStorage.getRole();
          
          if(roleName == 'admin'){
            this.router.navigate(['/home/list-my-posts']);
          }
          
        // }
      } else {
        this.toastr.warning('Thông tin đăng nhập không chính xác');
      }

      if(data.success === false){
        this.toastr.warning(data.message);
      }
    });
  }

  // get form(){
  //   return this.loginValidate.controls;
  // }


}
