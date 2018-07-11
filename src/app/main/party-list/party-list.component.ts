import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { PartyService } from '../../core/services/party.service';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.css']
})
export class PartyListComponent implements OnInit {

  partyList;
  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
    private partyService: PartyService
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
    this.partyService.listPartyService()
      .subscribe((res) => {
        this.partyList = res.body['parties'];
      });
  }
  deleteParty(id) {
    var result = confirm("Do you really want to delete?");
    if (result) {
      this.partyService.deletePartyService(id)
        .subscribe((res) => {
          this.toastrService.success('Party deleted Successfully', 'Success');
          this.getParty();
        }, (error) => {
          this.toastrService.error('Failure deleing Party', 'Failure');
        });
    }
  }
}