import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log("---------------------------");
    const token= localStorage.getItem('token');

    // console.log(token);

    
    let modifiedreq= req;
    if(token){
      modifiedreq= req.clone({
        setHeaders:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(modifiedreq);
    }

  
    return next.handle(modifiedreq).pipe(
      catchError((error:HttpErrorResponse)=>{
        if(error.status===401){
          console.log("Unauthorized request- Redirect to login");
          
        }
        return throwError(error)
      })
    );
  }
};
