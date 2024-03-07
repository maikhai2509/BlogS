import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Optional } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/_service/profile-service/profile.service';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {


  listUser = [];

  constructor(
    public dialogRef: MatDialogRef<ListUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private profileService: ProfileService,
    private changeDetectorRef: ChangeDetectorRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.listProfile();
  }


  listProfile(){
    this.profileService.getListUser().subscribe((res)=>{
      this.listUser = res.data
      console.log(this.listUser);
      this.changeDetectorRef.detectChanges();
    })
  }

  submit(){

  }

  deleteUser(idUser){
    console.log(idUser);
    this.profileService.deleteAccount(idUser).subscribe((res)=>{
      this.toastr.success('xoa thành công');
      this.listProfile();
    })
  }

  closeModal(){
    this.dialogRef.close({event: 'cancel'});
  }

}
