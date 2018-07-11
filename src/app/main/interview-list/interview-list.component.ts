import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { InterviewService } from '../../core/services/interview.service';


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
    private interviewService: InterviewService
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
    this.interviewService.listInterviewService()
      .subscribe((res) => {
        this.interviewList = res.body['interviews'];
      });
  }
  deleteInterview(id) {
    var result = confirm("Do you really want to delete?");
    if (result) {
      this.interviewService.deleteInterviewService(id)
        .subscribe((res) => {
          this.toastrService.success('Interview deleted Successfully', 'Success');
          this.getInterview();
        }, (error) => {
          this.toastrService.error('Failure deleing Interview', 'Failure');
        });
    }
  }
}
