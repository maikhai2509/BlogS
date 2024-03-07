import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.apiUrlServer + "blog";


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private searchResultSource = new BehaviorSubject<any>(null);
  currentSearchResult = this.searchResultSource.asObservable();

  constructor(
      private http: HttpClient,
  ) { }

  setSearchResult(result: any) {
    this.searchResultSource.next(result);
  }


  searchTitle(title:any,pageSize:any,pageIndex:any){
    return this.http.get(AUTH_API + `/find-by-title?title=${title}&pageSize=${pageSize}&pageIndex=${pageIndex}`);
  }

  getAllListPosts(pageSize:any,pageIndex:any){
    return this.http.get(AUTH_API + `/get?pageSize=${pageSize}&pageIndex=${pageIndex}`);
  }

  getAllListPostsByAccount(pageSize:any,pageIndex:any,accountId:any,roleName:any){
    return this.http.get(AUTH_API + `/get?pageSize=${pageSize}&pageIndex=${pageIndex}&accountId=${accountId}&roleName=${roleName}`);
  }

  getAllListPostsByAccountWithTopic(pageSize:any,pageIndex:any,accountId:any, topicId:any, roleName:any){
    return this.http.get(AUTH_API + `/get?pageSize=${pageSize}&pageIndex=${pageIndex}&accountId=${accountId}&topicId=${topicId}&roleName=${roleName}`);
  }

  getAllListPostsWithTopic(pageSize:any,pageIndex:any, topicId:any){
    return this.http.get(AUTH_API + `/get?pageSize=${pageSize}&pageIndex=${pageIndex}&topicId=${topicId}`);
  }


  getAllListPostsTest(topicId:any,pageSize:any,pageIndex:any){
    return this.http.get(AUTH_API + `/get?topicId=${topicId}&pageSize=${pageSize}&pageIndex=${pageIndex}`);
  }

// tạo post
  createPost(data:any):Observable<any>{
    return this.http.post(AUTH_API + '/create',data);
  }

  editPost(id:any,data:any):Observable<any>{
    return this.http.put(AUTH_API + `/update/${id}`,data);
  }

  deletePost(id):Observable<any>{
    return this.http.delete(AUTH_API + `/delete/${id}`);
  }

  viewDetailPost(id){
    return this.http.get(AUTH_API + `/getBlog?id=${id}`);
  }
}
