import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicComponent } from './component/public/public.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RegisterAccountComponent } from './component/register-account/register-account.component';
import { LoginComponent } from './component/login/login.component';
import { AuthenticatedComponent } from './component/authenticated/authenticated.component';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationComponent } from './component/pagination/pagination.component';
import { CreateUpdatePostComponent } from './component/home/create-update-post/create-update-post.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HomeComponent } from './component/home/home.component';
import { MatCommonModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewDetailPostComponent } from './component/home/view-detail-post/view-detail-post.component';
import { ListMyPostComponent } from './component/home/list-my-post/list-my-post.component';
import { CreateUpdateTopicComponent } from './component/home/create-update-topic/create-update-topic.component';
import { ListUserComponent } from './component/home/list-user/list-user.component';
import { ModalDeletePostComponent } from './component/home/modal-delete-post/modal-delete-post.component';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { DetailPostComponent } from './component/home/detail-post/detail-post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PublicComponent,
    RegisterAccountComponent,
    AuthenticatedComponent,
    PaginationComponent,
    SpinnerComponent,

    HomeComponent,
    CreateUpdatePostComponent,
    CreateUpdateTopicComponent,
    ViewDetailPostComponent,
    ModalDeletePostComponent,
    ListMyPostComponent,
    ListUserComponent,
    DetailPostComponent

  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,

    MatDialogModule,
    MatCheckboxModule,
    BrowserAnimationsModule,

    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
    }),
    AgGridModule.withComponents([
    ]),
    NgbModule,
  ],
  providers: [
    BsModalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
