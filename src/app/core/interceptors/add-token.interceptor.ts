import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../features/Authentication/services/auth.service';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {

  // req logic
  const authService = inject(AuthService)
  if (typeof authService.getToken()) {
    req = req.clone({
      setHeaders: {
        token: authService.getToken() || ""
      }
    })
  }


  return next(req);
};
