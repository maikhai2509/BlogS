import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateTopicComponent } from '../create-update-topic/create-update-topic.component';
import { ListUserComponent } from '../list-user/list-user.component';
import { CreateUpdatePostComponent } from '../create-update-post/create-update-post.component';
import { BlogService } from 'src/app/_service/blog-service/blog.service';
import { TopicService } from 'src/app/_service/topic-service/topic.service';
import { ViewDetailPostComponent } from '../view-detail-post/view-detail-post.component';
import { ModalDeletePostComponent } from '../modal-delete-post/modal-delete-post.component';
import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-list-my-post',
  templateUrl: './list-my-post.component.html',
  styleUrls: ['./list-my-post.component.scss']
})
export class ListMyPostComponent implements OnInit {


  listPosts = []
  listTopic = []

  accountId:any;

  roleName:any;

  page;
  pageSize = 10;
  total;
  totalPage;
  currentPage = 1;

  topicId = null;

  constructor(
    private matDialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private blogService: BlogService,
    private toppicService: TopicService,
    private tokenStorage: TokenStorageService
  ) {
    this.roleName = tokenStorage.getRole();
    console.log(this.roleName);
   }

  ngOnInit() {
    this.blogService.currentSearchResult.subscribe((result) => {
      this.listPosts = result;
      console.log(this.listPosts);
    });
    this.getAllListBlogs(1);
    this.getAllListTopics();
  }


  getAllListTopics(){
    this.toppicService.getListTopic().subscribe((res:any)=>{
      this.listTopic = res.data;
      this.changeDetectorRef.detectChanges();
    })
  }

  searchPosts(topicId){
    console.log(topicId);
    this.topicId = topicId;
    this.searchTopic(this.topicId,1);
  }

  getAllListBlogs(page){

    const pageIndex = page - 1 ;
    const pageSize = this.pageSize;

    this.currentPage = page;
    console.log(this.currentPage);

    const token = localStorage.getItem('auth-token');
      if(token) {
        this.accountId = jwtDecode(token)["profile"].account_id;
        console.log(this.accountId)
      }

    this.blogService.getAllListPostsByAccount(pageSize,pageIndex,this.accountId,this.roleName).subscribe((res:any)=>{
      this.listPosts = res.products;
      console.log(this.listPosts);
      this.total = res?.totalItem;
      this.totalPage = res?.totalPage;
      this.changeDetectorRef.detectChanges();
    })
  }


  searchTopic(topicId,page){

    const pageIndex = page - 1 ;
    const pageSize = this.pageSize;
    const token = localStorage.getItem('auth-token');
      if(token) {
        this.accountId = jwtDecode(token)["profile"].account_id;
      }

    this.currentPage = page;
    this.blogService.getAllListPostsByAccountWithTopic(this.pageSize,pageIndex,this.accountId,topicId, this.roleName).subscribe((res:any)=>{
      this.listPosts = res.products;
      console.log(this.listPosts);
      // this.total = res?.totalItem;
      // this.totalPage = res?.totalPage;
      this.changeDetectorRef.detectChanges();
    })
  }

  

  modalDeletePosts(item){
    this.matDialog.open(
      ModalDeletePostComponent,{
        data:item,
        maxHeight: '90vh',
        disableClose: false,
        panelClass:'list-trans-seller',
        hasBackdrop: true,
        width: '800px',
        autoFocus: false,
      }
    ).afterClosed().subscribe((res) => {
      console.log(res);
      this.searchPosts(1);
    });
  }

  viewDetailPost(item){

    if(this.roleName === 'admin'){
      this.matDialog.open(
        ViewDetailPostComponent,{
          data: item,
          maxHeight: '90vh',
          disableClose: false,
          panelClass:'list-trans-seller',
          hasBackdrop: true,
          width: '800px',
          autoFocus: false,
        }
      ).afterClosed().subscribe((res) => {
        console.log(res);
        this.getAllListBlogs(1);
      });
    }else(
      this.matDialog.open(
        CreateUpdatePostComponent,{
          data: item,
          maxHeight: '90vh',
          disableClose: false,
          panelClass:'list-trans-seller',
          hasBackdrop: true,
          width: '800px',
          autoFocus: false,
        }
      ).afterClosed().subscribe((res) => {
        console.log(res);
        this.getAllListBlogs(1);
      })
    )
  }

  openModalCreate(){
    this.matDialog.open(
      CreateUpdateTopicComponent,{
        maxHeight: '90vh',
        disableClose: false,
        panelClass:'list-trans-seller',
        hasBackdrop: true,
        width: '800px',
        autoFocus: false,
      }
    ).afterClosed().subscribe((res) => {
      console.log(res);
      this.getAllListBlogs(1);
    });
  }

  openModalTopic(){
    this.matDialog.open(
      CreateUpdatePostComponent,{
        maxHeight: '90vh',
        disableClose: false,
        panelClass:'list-trans-seller',
        hasBackdrop: true,
        width: '800px',
        autoFocus: false,
      }
    ).afterClosed().subscribe((res) => {
      console.log(res);
      this.getAllListTopics();
      this.getAllListBlogs(1);
    });
  }

  openModalListUser(){
    this.matDialog.open(
      ListUserComponent,{
        maxHeight: '90vh',
        disableClose: false,
        panelClass:'list-trans-seller',
        hasBackdrop: true,
        width: '800px',
        autoFocus: false,
      }
    ).afterClosed().subscribe((res) => {
      console.log(res);
      this.getAllListBlogs(1);
    });
  }

}
