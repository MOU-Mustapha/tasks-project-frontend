import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const userGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  if (localStorage.getItem('token')) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
