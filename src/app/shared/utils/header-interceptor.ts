import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { catchError } from 'rxjs/operators';

/**
 * Intercepts all http requests and allows for the request and/or response to be manipulated.
 *
 * @export
 * @class EnvironmentInterceptor
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
   * @memberof EnvironmentInterceptor
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const apiURL = request.headers.get('api-url');
    console.log(apiURL);

    const update = {} as any;

    update.url = `super_api/${request.url}`;

    return next.handle(request.clone(update));
  }
}
