import { ErrorHandler, NgModule } from '@angular/core';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenericListComponent } from './shared/generic-list/generic-list.component';
import { QuizModule } from './quiz/quiz.module';
import { GlobalErrorHandler } from './global/error-handler';
import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    HighchartsChartModule
],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: ErrorHandler,
    useClass: GlobalErrorHandler
  }
  ],
  bootstrap: [AppComponent]
})


export class AppModule {}
