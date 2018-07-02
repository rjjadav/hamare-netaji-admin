import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-states',
  templateUrl: './manage-states.component.html',
  styleUrls: ['./manage-states.component.css']
})
export class ManageStatesComponent implements OnInit {
  statesList;
  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.getStates();
  }

  getStates() {
    this.httpClient.get('http://139.162.53.4/netaji/admin/getStates')
      .subscribe((res) => {
        console.log(res);
        this.statesList = res['states'];
      });
  }
  deleteState(id) {
    var result = confirm("Do you really want to delete?");
    if (result) {
      this.httpClient.get('http://139.162.53.4/netaji/admin/deleteState?id='+id)
      .subscribe((res) => {
        this.toastrService.success('State deleted Successfully', 'Success');
       this.getStates();
      },(error)=>{
      this.toastrService.error('Failure deleing State', 'Failure');
      });
    }
  }
}
