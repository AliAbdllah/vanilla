import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as qs from 'qs';
import { DialogComponent } from '../components/dialog/dialog.component';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiURL = environment.apiUrl;
  retry = 1;
  constructor(private _http: HttpClient, private _dialog: MatDialog) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public qsParams(params: any, filters?: any) {
    const obj = {};
    obj['populate'] = params;
    if (filters) {
      obj['filters'] = filters;
    }
    return qs.stringify(obj);
  }
  public queryStringlify(obj: any): string {
    const result = qs.stringify(obj);
    return result;
  }
  public get<T>(
    url: string,
    params?: any,
    routerParam?: any,
    errorMessage?: string
  ): Observable<T> {
    let apiParam = routerParam
      ? '/' + routerParam + '?' + params
      : '?' + params;
    const fullUrl = `/${url}${apiParam}`.replace(/\/\//g, '/');
    return this._http.get<T>(this.apiURL + fullUrl).pipe(
      retry(this.retry),
      catchError((error) => {
        console.error(error);
        return this.handleError(error, errorMessage || null);
      })
    );
  }

  public post<T>(url: string, body: any, errorMessage?: string): Observable<T> {
    const header = this._prepareHeaders(false, null);
    return this._http
      .post<T>(`${this.apiURL}/${url}`, JSON.stringify(body), {
        headers: header,
        observe: 'response',
      })
      .pipe(
        map((res: any) => res.body),
        catchError((error) => {
          return this.handleError(error, errorMessage || null);
        })
      );
  }

  // Error handling
  private handleError(error, customizedErrorMessage?: string) {
    let errorMessage =
      error?.error?.message ||
      `Error Code: ${error.status}\nMessage: ${error.message}`;
    let displayedErrorMessage;
    customizedErrorMessage
      ? (displayedErrorMessage = customizedErrorMessage)
      : (displayedErrorMessage =
          'Something went wrong. Please try again later.');
    this._dialog.closeAll();
    this._dialog.open(DialogComponent, {
      data: {
        message: displayedErrorMessage,
        status: 'Failure',
      },
    });
    return throwError(errorMessage);
  }

  private _prepareHeaders(urlEncoded, additionalHeaders): HttpHeaders {
    const headersParams = {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: '',
    };
    if (urlEncoded) {
      headersParams['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    for (const item in additionalHeaders) {
      if (additionalHeaders.hasOwnProperty(item)) {
        headersParams[item] = additionalHeaders[item];
      }
    }
    return new HttpHeaders(headersParams);
  }

  public postFile(
    url: string,
    formData: FormData,
    errorMessage?: string
  ): Observable<any[]> {
    return this._http.post<any>(`${this.apiURL}/${url}`, formData).pipe(
      map((res: any) => res),
      catchError((error) => {
        return this.handleError(error, errorMessage || null);
      })
    );
  }
}
