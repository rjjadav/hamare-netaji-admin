import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-party-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css']
})
export class InterviewListComponent implements OnInit {

  interviewList;
  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.getInterview();
  }
  getInterview() {
    /*const token = JSON.parse(window.localStorage.getItem('token')).result;
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${token['access_token']}` });
    let options = {
      'headers': headers
    }*/
    this.httpClient.get('http://139.162.53.4/netaji/admin/getInterview')
      .subscribe((res) => {
        this.interviewList = res['interviews'];
      });
  }
  deleteInterview(id) {
    var result = confirm("Do you really want to delete?");
    if (result) {
      this.httpClient.get('http://139.162.53.4/netaji/admin/deleteInterview?id='+id)
      .subscribe((res) => {
        this.toastrService.success('Interview deleted Successfully', 'Success');
       this.getInterview();
      },(error)=>{
      this.toastrService.error('Failure deleing Interview', 'Failure');
      });
    }
  }
}
