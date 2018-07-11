import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { error } from 'util';
import { LeaderProfileService } from '../../core/services/leaderprofile.service';


@Component({
  selector: 'app-leader-profile',
  templateUrl: './leader-list.component.html',
  styleUrls: ['./leader-list.component.css']
})

export class LeaderListComponent implements OnInit {

  leaderList;
  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
    private leaderProfileService: LeaderProfileService
  ) { }

  ngOnInit() {
    this.getLeader();
  }
  getLeader() {
    /*const token = JSON.parse(window.localStorage.getItem('token')).result;
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${token['access_token']}` });
    let options = {
      'headers': headers
    }*/
    this.leaderProfileService.listLeaderProfileService()
      .subscribe((res) => {
        console.log(res);
        this.leaderList = res.body['profiles'];

      });
  }
  deleteLeader(id) {
    var result = confirm("Do you really want to delete?");
    if (result) {
      this.leaderProfileService.deleteLeaderProfileService(id)
        .subscribe((res) => {
          this.toastrService.success('Leader deleted Successfully', 'Success');
          this.getLeader();
        }, (error) => {
          this.toastrService.error('Failure deleing Leader', 'Failure');
        });
    }
  }
}

