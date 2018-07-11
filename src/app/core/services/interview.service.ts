import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class InterviewService {

    constructor(
        private httpClient: HttpClient
    ) { }

    listInterviewService(): Observable<any> {
        const url = `http://139.162.53.4/netaji/admin/getInterview`;
        return this.httpClient.get(url, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
    deleteInterviewService(id): Observable<any> {
        const url = `http://139.162.53.4/netaji/admin/deleteInterview?id=` + id;
        return this.httpClient.get(url, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
    createInterviewService(code): Observable<any> {
        const url = `http://139.162.53.4/netaji/admin/addInterview`;
        return this.httpClient.post(url, code, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
    editInterviewService(code): Observable<any> {
        const url = `http://139.162.53.4/netaji/admin/editInterview`;
        return this.httpClient.post(url, code, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
    getInterviewByIDService(id): Observable<any> {
        const url = `http://139.162.53.4/netaji/admin/getInterview?id=` + id;
        return this.httpClient.get(url, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
}
