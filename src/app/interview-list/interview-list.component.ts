import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-party-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css']
})
export class InterviewListComponent implements OnInit {

  interviewList;
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.getParty();
  }
  getParty() {
    const token = JSON.parse(window.localStorage.getItem('token')).result;
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${token['access_token']}` });
    let options = {
      'headers': headers
    }
    this.httpClient.get('http://139.162.53.4/netaji/admin/getInterview', options)
      .subscribe((res) => {
        console.log(res);
        this.interviewList = res['interviews'];
      });
  }

}
