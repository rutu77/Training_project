import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, retry, throwError, TimeoutError, timeout, timer } from 'rxjs';
import { AuthSessionService } from '../services/auth-session.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly session: AuthSessionService,
    private readonly router: Router
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.session.getToken();
    const isPublicAuthRequest = /\/auth\/(login|register)$/.test(req.url);
    const request = token && !isPublicAuthRequest
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(request).pipe(
      retry({
        count: 1,
        delay: (error: unknown) => {
          if (
            error instanceof HttpErrorResponse &&
            error.status === 0 &&
            (req.method === 'GET' || req.method === 'HEAD')
          ) {
            return timer(500);
          }
          return throwError(() => error);
        },
      }),
      timeout({ each: 30_000 }),
      catchError((error: unknown) => {
        if (error instanceof TimeoutError) {
          console.error(`API request timed out after 30 seconds: ${req.method} ${req.url}`);
        }
        if (error instanceof HttpErrorResponse && error.status === 0) {
          console.error(
            `API connection failed for ${req.method} ${req.url}. Confirm the backend is running at ${environment.apiUrl} and that the browser origin is allowed by CORS.`,
            error
          );
        }
        if (error instanceof HttpErrorResponse && error.status === 401 && token && !isPublicAuthRequest) {
          const returnUrl = this.router.url;
          this.session.clearSession();
          void this.router.navigate(['/auth/login'], {
            queryParams: returnUrl.startsWith('/') && !returnUrl.startsWith('//')
              ? { returnUrl }
              : undefined,
          });
        }
        return throwError(() => error);
      })
    );
  }
}
