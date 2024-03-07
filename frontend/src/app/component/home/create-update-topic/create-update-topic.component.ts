import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Optional } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { TopicService } from 'src/app/_service/topic-service/topic.service';

@Component({
  selector: 'app-create-update-topic',
  templateUrl: './create-update-topic.component.html',
  styleUrls: ['./create-update-topic.component.scss']
})
export class CreateUpdateTopicComponent implements OnInit {

  body = {
    topicName:null,
  }

  listCategory = []

  listTopic = [];

  constructor(
    public dialogRef: MatDialogRef<CreateUpdateTopicComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private topicService: TopicService,
    private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getListTopic();
  }


  getListTopic(){
    this.topicService.getListTopic().subscribe((res)=>{
      this.listTopic = res.data;
      this.changeDetectorRef.detectChanges();
    })
  }

  createTopic(){
    this.topicService.createTopic(this.body).subscribe((res)=>{
      this.toastr.success('Them thành công');
      this.getListTopic();
      this.changeDetectorRef.detectChanges();
    })
  }

  deleteTopic(item){
    this.topicService.deleteTopic(item._id).subscribe((res)=>{
      this.toastr.success('Xoa thành công');
      this.getListTopic();
      this.changeDetectorRef.detectChanges();
    })
  }

  closeModal(){
    this.dialogRef.close({event: 'cancel'});
  }

}
