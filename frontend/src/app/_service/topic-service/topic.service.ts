import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const AUTH_API = environment.apiUrlServer + "topic";
@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(
    private http: HttpClient,
  ) { }

  createTopic(data:any):Observable<any>{
    return this.http.post(AUTH_API + '/create',data);
  }

  getListTopic():Observable<any>{
    return this.http.get(AUTH_API + '/get-topics');
  }

  deleteTopic(idTopic):Observable<any>{
    return this.http.delete(AUTH_API + `/delete/${idTopic}`);
  }


}
