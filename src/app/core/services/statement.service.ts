import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class StatementService {

    constructor(
        private httpClient: HttpClient
    ) { }

    listStatementService(): Observable<any> {
        const url = `http://139.162.53.4/netaji/admin/getHumareNetajiKahein`;
        return this.httpClient.get(url, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
    deleteStatementService(id): Observable<any> {
        const url = `http://139.162.53.4/netaji/admin/deleteHumareNetajiKahein?id=` + id;
        return this.httpClient.get(url, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
    createStatementService(code): Observable<any> {
        const url = `http://139.162.53.4/netaji/admin/addHumareNetajiKahein`;
        return this.httpClient.post(url, code, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
    editStatementService(code): Observable<any> {
        const url = `http://139.162.53.4/netaji/admin/editHumareNetajiKahein`;
        return this.httpClient.post(url, code, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
    getStatementByIDService(id): Observable<any> {
        const url = `http://139.162.53.4/netaji/admin/getHumareNetajiKahein?id=` + id;
        return this.httpClient.get(url, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
}