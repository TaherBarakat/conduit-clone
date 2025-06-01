import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
type AuthRequirement = 'required' | 'optional' | 'none';

interface EndpointConfig {
  method: string;
  matcher: string;
  auth: AuthRequirement;
}

const API_ENDPOINTS: EndpointConfig[] = [
  // User and Authentication
  { method: 'GET', matcher: '/user', auth: 'required' },
  { method: 'PUT', matcher: '/user', auth: 'required' },
  { method: 'POST', matcher: '/users', auth: 'none' },
  { method: 'POST', matcher: '/users/login', auth: 'none' },

  // Profile
  { method: 'GET', matcher: '/profiles/:username', auth: 'optional' },
  { method: 'POST', matcher: '/profiles/:username/follow', auth: 'required' },
  { method: 'DELETE', matcher: '/profiles/:username/follow', auth: 'required' },

  // Articles
  { method: 'GET', matcher: '/articles/feed', auth: 'required' },
  { method: 'GET', matcher: '/articles', auth: 'optional' },
  { method: 'POST', matcher: '/articles', auth: 'required' },
  { method: 'GET', matcher: '/articles/:slug', auth: 'none' },
  { method: 'PUT', matcher: '/articles/:slug', auth: 'required' },
  { method: 'DELETE', matcher: '/articles/:slug', auth: 'required' },

  // Comments
  { method: 'GET', matcher: '/articles/:slug/comments', auth: 'none' },
  { method: 'POST', matcher: '/articles/:slug/comments', auth: 'required' },
  {
    method: 'DELETE',
    matcher: '/articles/:slug/comments/:id',
    auth: 'required',
  },

  // Favorites
  { method: 'POST', matcher: '/articles/:slug/favorite', auth: 'required' },
  { method: 'DELETE', matcher: '/articles/:slug/favorite', auth: 'required' },

  // Tags
  { method: 'GET', matcher: '/tags', auth: 'none' },
];

function findMatchingEndpoint(
  method: string,
  path: string
): EndpointConfig | undefined {
  return API_ENDPOINTS.find((endpoint) => {
    // 1. Check HTTP method (case-insensitive)
    if (endpoint.method.toUpperCase() !== method.toUpperCase()) {
      return false;
    }

    // 2. Check path pattern
    const endpointParts = endpoint.matcher.split('/');
    const pathParts = path.split('/api')[1].split('/');

    // Different segment count means no match
    if (endpointParts.length !== pathParts.length) {
      return false;
    }

    // Compare each segment
    for (let i = 0; i < endpointParts.length; i++) {
      const endpointPart = endpointParts[i];
      const pathPart = pathParts[i];

      // If it's a parameter (starts with ':'), skip exact comparison
      if (endpointPart.startsWith(':')) {
        continue;
      }

      // Exact match required for non-parameter parts
      if (endpointPart !== pathPart) {
        return false;
      }
    }

    // All checks passed
    return true;
  });
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authSrv = inject(AuthService);
  const token = authSrv.getToken();

  let pathConfig = findMatchingEndpoint(req.method, req.url);

  if (!pathConfig) return next(req);
  else {
    switch (pathConfig.auth) {
      case 'none':
        return next(req);

      case 'required':
        console.log(req.url, req.method, 'needAuth');
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next(cloned);
      case 'optional':
        if (token) {
          console.log(req.url, req.method, 'optionalAddedAuth');
          // console.log(req, '');
          const vcloned = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next(vcloned);
        } else return next(req);
    }
  }
};
