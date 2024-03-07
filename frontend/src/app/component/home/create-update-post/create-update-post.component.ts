import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Optional } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/_service/blog-service/blog.service';
import { TopicService } from 'src/app/_service/topic-service/topic.service';
import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-create-update-post',
  templateUrl: './create-update-post.component.html',
  styleUrls: ['./create-update-post.component.scss']
})
export class CreateUpdatePostComponent implements OnInit {

  isUpdate = false;

  body = {
    _id: null,
    Title:null,
    Content:null,
    AuthorId:null,
    TopicId:null,
    DesCription:null
  }

  listTopic = [];

  constructor(
    public dialogRef: MatDialogRef<CreateUpdatePostComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private blogService: BlogService,
    private toastr: ToastrService,
    private topicService: TopicService,
    private tokenStorageService: TokenStorageService,
    private changeDetectorRef: ChangeDetectorRef
  ) { 
    //console.log(this.body);
    if(data !== null){
      this.isUpdate = true;
      this.body = data.blog;
    }
  }
  
  ngOnInit() {
    this.getListTopic();
  }

  getListTopic(){
    this.topicService.getListTopic().subscribe((res)=>{
      this.listTopic = res.data;
      this.changeDetectorRef.detectChanges();
    })
  }

  createPosts(){
    //data truyền từ FE xuống BE
    const token = localStorage.getItem('auth-token');
    if(this.body._id == null || this.body._id == undefined){
      if(token) {
        this.body.AuthorId = jwtDecode(token)["profile"].account_id
      }
          this.blogService.createPost(this.body).subscribe((res)=>{
          this.toastr.success('Them thành công');
          this.changeDetectorRef.detectChanges();
          this.dialogRef.close();
      })
    }else{
      this.blogService.editPost(this.body._id,this.body).subscribe((res)=>{
        this.toastr.success('sua thành công');
        this.dialogRef.close();
      })
    }
  }

  closeModal(){
    this.dialogRef.close({event: 'cancel'});
  }
}
