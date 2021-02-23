import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isString } from 'ngx-bootstrap/chronos/utils/type-checks';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private tostr: ToastrService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error) {
          switch (error.status) {
            case 400:
              // console.log(error);
              if (error.error.errors) {
                // initialising an empty array to store errors
                const modelStateError = [];
                // looping over each item  and pushing to the array
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modelStateError.push(error.error.errors[key]);
                  }
                  throw modelStateError.flat();
                }
              } else if (typeof error.error === 'object') {
                this.tostr.error(error.statsText, error.status);
              } else {
                this.tostr.error(error.error, error.status);
              }
              break;
            case 401:
              this.tostr.error(error.error, error.status);
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {
                state: { error: error.error },
              };
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.tostr.error('Something went wrong!');
              console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
