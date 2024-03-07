import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdatePostComponent } from './create-update-post/create-update-post.component';
import { TopicService } from 'src/app/_service/topic-service/topic.service';
import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';
import { BlogService } from 'src/app/_service/blog-service/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  listTopic = []
  listPosts = []
  roleName:any;

  topicId;
  page;
  pageSize = 10;
  total;
  totalPage;
  currentPage = 1;
  
  constructor(
    private matDialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private toppicService: TopicService,
    private tokenStorage: TokenStorageService,
    private blogService: BlogService
  ) { 
    this.roleName = tokenStorage.getRole();
  }

  ngOnInit() {
    this.blogService.currentSearchResult.subscribe((result) => {
      this.listPosts = result;
      console.log(this.listPosts);
    });
    this.getAllListTopics();
    this.getAllListBlogs(1);
  }

  getAllListBlogs(page){

    const data = {
      topicId: this.topicId
    }
    const pageIndex = page - 1 ;
    const pageSize = this.pageSize;

    this.currentPage = page;
    this.blogService.getAllListPosts(pageSize,pageIndex).subscribe((res:any)=>{
      this.listPosts = res.products;
      this.total = res?.totalItem;
      this.totalPage = res?.totalPage;
      console.log(this.listPosts);
      this.changeDetectorRef.detectChanges();
    })
  }

  getAllListTopics(){
    this.toppicService.getListTopic().subscribe((res:any)=>{
      this.listTopic = res.data;
    })
  }

  searchTopic(topicId){

    const pageIndex = 0 ;
    // const token = localStorage.getItem('auth-token');
    //   if(token) {
    //     this.accountId = jwtDecode(token)["profile"].account_id;
    //   }

    //this.currentPage = page;
    this.blogService.getAllListPostsWithTopic(this.pageSize,pageIndex,topicId).subscribe((res:any)=>{
      this.listPosts = res.products;
      console.log(this.listPosts);
      // this.total = res?.totalItem;
      // this.totalPage = res?.totalPage;
      this.changeDetectorRef.detectChanges();
    })
  }

  openModalCreate(){
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
    });
  }
}
