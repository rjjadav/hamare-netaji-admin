import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.css']
})
export class PartyListComponent implements OnInit {

  partyList;
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.getParty();
  }
  getParty() {
    /*const token = JSON.parse(window.localStorage.getItem('token')).result;
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${token['access_token']}` });
    let options = {
      'headers': headers
    }*/
    this.httpClient.get('http://139.162.53.4/netaji/admin/getParties')
      .subscribe((res) => {
        console.log(res);
        this.partyList = res['parties'];
      });
  }

}
