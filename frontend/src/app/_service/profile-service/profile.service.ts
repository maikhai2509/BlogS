import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


const AUTH_API = environment.apiUrlServer + "auth";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

constructor(
  private http: HttpClient,
) { }


  getListUser():Observable<any>{
    return this.http.get(AUTH_API + '/accounts');
  }

  registerAccount(data):Observable<any>{
    return this.http.post(AUTH_API + '/sign-up',data);
  }

  deleteAccount(id):Observable<any>{
    return this.http.delete(AUTH_API + `/delete?id=${id}`);
  }

}
