import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import {catchError} from 'rxjs/internal/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor{
  constructor(
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    const authToken = JSON.parse(window.localStorage.getItem('token'));
    let authReq;
    if (authToken != null) {
      authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken['result']['access_token']}`)
      });
    } else {
      authReq = request.clone({});
    }

    return next.handle(authReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // success
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/auth/login']);
          }
        }
      })
    );

    /*return next.handle(authReq).tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // success
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigate(['/auth/login']);
        }
      }
    });*/
  }
}
