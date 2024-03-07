import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './component/public/public.component';
import { RegisterAccountComponent } from './component/register-account/register-account.component';
import { LoginComponent } from './component/login/login.component';
import { AuthenticatedComponent } from './component/authenticated/authenticated.component';
import { HomeComponent } from './component/home/home.component';
import { ListMyPostComponent } from './component/home/list-my-post/list-my-post.component';
import { DetailPostComponent } from './component/home/detail-post/detail-post.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home/list-posts' },
  { path: '', component: PublicComponent, children: [
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register-account',
      component: RegisterAccountComponent
    }, 
    {
      path: 'home',
      component: AuthenticatedComponent,
      children: [
        { path: 'list-posts', component: HomeComponent},
        { path: 'list-my-posts', component: ListMyPostComponent},
        { path: 'detail-post/:id', component: DetailPostComponent }
      ]
    }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
