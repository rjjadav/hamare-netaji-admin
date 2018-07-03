import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { error } from 'util';

@Component({
  selector: 'app-hamare-netaji-kahen',
  templateUrl: './hamare-netaji-kahen-list.component.html',
  styleUrls: ['./hamare-netaji-kahen-list.component.css']
})
export class HamareNetajiKahenListComponent implements OnInit {
  statementList;
  constructor(private httpClient: HttpClient,
    private toastrService: ToastrService,) { }

  ngOnInit() {
    this.getStatements();
  }
  getStatements() {
    /*const token = JSON.parse(window.localStorage.getItem('token')).result;
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${token['access_token']}` });
    let options = {
      'headers': headers
    }*/
    this.httpClient.get('http://139.162.53.4/netaji/admin/getHumareNetajiKahein')
      .subscribe((res) => {
        console.log(res);
        this.statementList = res['humareNetajiKahein'];
        
      });
  }
  deleteStatement(id) {
    var result = confirm("Do you really want to delete?");
    if (result) {
      this.httpClient.get('http://139.162.53.4/netaji/admin/deleteHumareNetajiKahein?id=' + id)
        .subscribe((res) => {
          this.toastrService.success('Leader deleted Successfully', 'Success');
          this.getStatements();
        }, (error) => {
          this.toastrService.error('Failure deleing Leader', 'Failure');
        });
    }
  }
}
