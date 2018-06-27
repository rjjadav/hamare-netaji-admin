import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-manage-states',
  templateUrl: './manage-states.component.html',
  styleUrls: ['./manage-states.component.css']
})
export class ManageStatesComponent implements OnInit {
  statesList;
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.getStates();
  }

  getStates() {
    const token = JSON.parse(window.localStorage.getItem('token')).result;
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${token['access_token']}`});
    let options = {
      'headers': headers
    }
    this.httpClient.get('http://139.162.53.4/netaji/admin/getStates', options)
      .subscribe((res) => {
        console.log(res);
        this.statesList = res['states'];
      });
  }
}
