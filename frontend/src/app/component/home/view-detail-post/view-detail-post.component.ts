import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Optional } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/_service/blog-service/blog.service';
import { TopicService } from 'src/app/_service/topic-service/topic.service';

@Component({
  selector: 'app-view-detail-post',
  templateUrl: './view-detail-post.component.html',
  styleUrls: ['./view-detail-post.component.scss']
})
export class ViewDetailPostComponent implements OnInit {

  body = {
    Title:null,
    topicId:null,
    DesCription:null
  }
  listTopic = [];

  blogs:any;
  author:any;

  constructor(
    public dialogRef: MatDialogRef<ViewDetailPostComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private topicService: TopicService,
    private changeDetectorRef: ChangeDetectorRef,
    private blogService: BlogService,
    private toastr: ToastrService

  ) { 
    console.log(data);
    this.blogs = data.blog;
    this.author = data.author;
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

  closeModal(){
    this.dialogRef.close({event: 'cancel'});
  }

  deletePost(){
    this.blogService.deletePost(this.blogs._id).subscribe((res)=>{
      this.toastr.success('Xoa thành công');
      this.changeDetectorRef.detectChanges();
      this.dialogRef.close();
    })
  }

}
