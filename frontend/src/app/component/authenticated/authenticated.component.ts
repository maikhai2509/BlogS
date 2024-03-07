import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/_service/blog-service/blog.service';
import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss']
})
export class AuthenticatedComponent implements OnInit {

  roleName:any;
  constructor(
    private tokenStorageService: TokenStorageService,
    private toastr: ToastrService,
    private blogService: BlogService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {
    this.roleName = tokenStorage.getRole();
    console.log(this.roleName);
   }

  username;
  fullname;
  checkRole = false
  functionCode;

  listPosts = [];
  title

  ngOnInit() {
    // this.username = this.tokenStorageService.getUser();
    // this.fullname = this.tokenStorageService.getFullName();
    this.username = this.tokenStorageService.getUser();
  }

  searchService(){
    // this.blogService.searchTitle(t)
    if(this.title === null || this.title === undefined){
      this.blogService.getAllListPosts(4,1).subscribe((res:any)=>{
        console.log(res);
        this.listPosts = res.products;
        console.log(this.listPosts);
        this.blogService.setSearchResult(this.listPosts);
      })
    }else{
      this.blogService.searchTitle(this.title,4,1).subscribe((res:any)=>{
        console.log(res);
        this.listPosts = res.products;
        console.log(this.listPosts);
        this.blogService.setSearchResult(this.listPosts);
      })
    }
    
    
  }

  logout(){
    this.tokenStorageService.clearUser();
    window.location.reload();
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('functionCode');
    sessionStorage.removeItem(environment.authTokenKey);
    this.toastr.success('Đăng xuất thành công');
    this.router.navigate(['/home/list-posts']);
  }

}
