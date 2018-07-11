import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class StateService {

  constructor(
    private httpClient: HttpClient
  ) { }

  stateListService(): Observable<any> {
    const url = `http://139.162.53.4/netaji/admin/getStates`;
    return this.httpClient.get(url, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res;
      },
        error => {
          return error;
        }));
  }
  createStateService(code): Observable<any> {
    const url = `http://139.162.53.4/netaji/admin/addState`;
    return this.httpClient.post(url, code, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res;
      },
        error => {
          return error;
        }));
  }
  editStateService(code): Observable<any> {
    const url = `http://139.162.53.4/netaji/admin/editState`;
    return this.httpClient.post(url, code, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res;
      },
        error => {
          return error;
        }));
  }
  getStateService(code): Observable<any> {
    const url = `http://139.162.53.4/netaji/admin/getStates?id=` + code;
    return this.httpClient.get(url, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res;
      },
        error => {
          return error;
        }));
  }
  deleteStateService(id): Observable<any> {
    const url = `http://139.162.53.4/netaji/admin/deleteState?id=` + id;
    return this.httpClient.get(url, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res;
      },
        error => {
          return error;
        }));
  }
}
