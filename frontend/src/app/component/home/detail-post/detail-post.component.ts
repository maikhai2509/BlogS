import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/_service/blog-service/blog.service';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit {

  idPost:any;
  viewDetail;


  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private toastr: ToastrService
  ) { 
    this.idPost = this.activatedRoute.snapshot.params['id'];
    console.log(this.idPost);
  }

  ngOnInit() {
    this.viewDetailPost();
  }

  viewDetailPost(){
    this.blogService.viewDetailPost(this.idPost).subscribe((res:any)=>{
      this.viewDetail = res.data;
      console.log(this.viewDetail);
    })
  }

}
