import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadHandleInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService)
  if(!req.url.includes("comments")) {
    spinner.show();
  }
  return next(req).pipe(finalize(() => {
    spinner.hide()
  }));
};
