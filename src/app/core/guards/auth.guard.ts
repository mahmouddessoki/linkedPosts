import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/Authentication/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const router = inject(Router)
  if (auth.getToken()) {
    router.navigate(['/timeline'])
    return false
  }
  return true;
};
