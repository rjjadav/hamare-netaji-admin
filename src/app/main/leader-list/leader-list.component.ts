import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { error } from 'util';

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
    this.httpClient.get('http://139.162.53.4/netaji/admin/getProfiles')
      .subscribe((res) => {
        console.log(res);
        this.leaderList = res['profiles'];
        
      });
  }
  deleteLeader(id) {
    var result = confirm("Do you really want to delete?");
    if (result) {
      this.httpClient.get('http://139.162.53.4/netaji/admin/deleteProfile?id=' + id)
        .subscribe((res) => {
          this.toastrService.success('Leader deleted Successfully', 'Failure');
          this.getLeader();
        }, (error) => {
          this.toastrService.error('Failure deleing Leader', 'Failure');
        });
    }
  }
}
  
