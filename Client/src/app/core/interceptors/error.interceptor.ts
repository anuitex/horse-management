import {
  HttpErrorResponse, HttpEvent, HttpHandler,

  HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly toastrService: ToastrService,
    private readonly spinner: NgxSpinnerService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        this.spinner.hide();
        if (error instanceof HttpErrorResponse && error.status === 0) {
          this.toastrService.error(error.message);
          return throwError(error);
        }
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return throwError(error);
        }
        if (error instanceof HttpErrorResponse && error.status === 403) {
          alert("Log Out")
        }
        else {
          this.toastrService.error(error.error);
          return throwError(error);
        }
      }),
    );
  }
}
