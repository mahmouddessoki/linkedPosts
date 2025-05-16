import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorHandleInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ToastrService)
  return next(req).pipe(catchError((err) => {
    const errMsg = err.error.error || err.error.message
    toaster.error(errMsg, '')
    return throwError(err);
  }));
};
