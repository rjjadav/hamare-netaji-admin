import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class PartyService {

    constructor(
        private httpClient: HttpClient
    ) { }

    listPartyService(): Observable<any> {
        const url = `http://139.162.53.4/netaji/admin/getParties`;
        return this.httpClient.get(url, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
    deletePartyService(id): Observable<any> {
        const url = `http://139.162.53.4/netaji/admin/deleteParties?id=` + id;
        return this.httpClient.get(url, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
    createPartyService(code): Observable<any> {
        const url = `http://139.162.53.4/netaji/admin/addParty`;
        return this.httpClient.post(url, code, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
    editPartyService(code): Observable<any> {
        const url = `http://139.162.53.4/netaji/admin/editParty`;
        return this.httpClient.post(url, code, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
    getPartyByIDService(id): Observable<any> {
        const url = `http://139.162.53.4/netaji/admin/getParties?id=` + id;
        return this.httpClient.get(url, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
}
