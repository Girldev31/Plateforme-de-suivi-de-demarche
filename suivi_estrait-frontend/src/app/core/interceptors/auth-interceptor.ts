import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  if (token) {
    const isFormData = req.body instanceof FormData;

    const cloned = req.clone({
      setHeaders: isFormData
        ? { Authorization: `Bearer ${token}` }
        : {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
    });
    return next(cloned);
  }

  return next(req);
};