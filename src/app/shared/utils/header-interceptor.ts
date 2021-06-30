import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { catchError } from 'rxjs/operators';

/**
 * Intercepts all http requests and allows for the request and/or response to be manipulated.
 *
 * @export
 * @class TokenInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class EnvironmentInterceptor implements HttpInterceptor {

  constructor() { }

  /**
   * request intercept handler to automatically retrieve the api url from request header (set by cloudfront function).
   *
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @memberof TokenInterceptor
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    console.log('request: ', request);

    const update = {} as any;

    update.url = `super_api/${request.url}`;

    return next.handle(request.clone(update));
    // return next.handle(request).pipe(
    //   catchError(error => {
    //     if (error.status === 403) {
    //       console.log('403 caught')
    //     }
    //     return throwError(error);
    //   })
    // );
  }
}
