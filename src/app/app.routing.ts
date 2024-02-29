import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import {NewArticleFormComponent} from "./new-article-form/new-article-form.component";
import {ArticleCardComponent} from "./article-card/article-card.component";
import {ArticleListComponent} from "./article-list/article-list.component";
import {ArticleDetailComponent} from "./article-detail/article-detail.component";

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  },

  { path: 'new-article-form', component: NewArticleFormComponent },
  { path: 'article-card', component: ArticleCardComponent },
  { path:'article'  , component:ArticleListComponent},
  { path: 'article-detail/:id', component: ArticleDetailComponent },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
