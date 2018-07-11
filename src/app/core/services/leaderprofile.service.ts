import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class LeaderProfileService {

    constructor(
        private httpClient: HttpClient
    ) { }

    listLeaderProfileService(): Observable<any> {
        const url = `http://139.162.53.4/netaji/admin/getProfiles`;
        return this.httpClient.get(url, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
    deleteLeaderProfileService(id): Observable<any> {
        const url = `http://139.162.53.4/netaji/admin/deleteProfile?id=` + id;
        return this.httpClient.get(url, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
    createLeaderProfileService(code): Observable<any> {
        const url = `http://139.162.53.4/netaji/admin/createProfile`;
        return this.httpClient.post(url, code, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
    editLeaderProfileService(code): Observable<any> {
        const url = `http://139.162.53.4/netaji/admin/editProfile`;
        return this.httpClient.post(url, code, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
    getLeaderProfileByIDService(id): Observable<any> {
        const url = `http://139.162.53.4/netaji/admin/getProfiles?id=` + id;
        return this.httpClient.get(url, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
}
