import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NotfoundComponent } from './notfound/notfound.component';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AdminModule } from './admin/admin.module';
import {SharedModule } from "./shared/shared.module";
import { HomeModule } from './home/home.module';
import { CourseModule } from './course/course.module';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenericListComponent } from './shared/generic-list/generic-list.component';



@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    UpdateProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    RouterModule,
    HttpClientModule,
    SharedModule,
    AdminModule,
    BrowserAnimationsModule,
    HomeModule,
    CourseModule
],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})


export class AppModule {}
