import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Optional } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/_service/blog-service/blog.service';
import { ListMyPostComponent } from '../list-my-post/list-my-post.component';

@Component({
  selector: 'app-modal-delete-post',
  templateUrl: './modal-delete-post.component.html',
  styleUrls: ['./modal-delete-post.component.scss']
})
export class ModalDeletePostComponent implements OnInit {

  blogs:any;
  author:any;

  constructor(
    public dialogRef: MatDialogRef<ModalDeletePostComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private blogService: BlogService,
    private changeDetectorRef: ChangeDetectorRef,
    private toastr: ToastrService,
  ) { 
    console.log(data);
    this.blogs = data.blog;
    this.author = data.author;
  }

  ngOnInit() {
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
