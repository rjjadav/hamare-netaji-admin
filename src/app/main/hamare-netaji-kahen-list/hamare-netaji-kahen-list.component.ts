import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { error } from 'util';
import { StatementService } from '../../core/services/statement.service';
StatementService

@Component({
  selector: 'app-hamare-netaji-kahen',
  templateUrl: './hamare-netaji-kahen-list.component.html',
  styleUrls: ['./hamare-netaji-kahen-list.component.css']
})
export class HamareNetajiKahenListComponent implements OnInit {
  statementList;
  constructor(private httpClient: HttpClient,
    private toastrService: ToastrService,
    private statementService: StatementService) { }

  ngOnInit() {
    this.getStatements();
  }
  getStatements() {
    /*const token = JSON.parse(window.localStorage.getItem('token')).result;
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${token['access_token']}` });
    let options = {
      'headers': headers
    }*/
    this.statementService.listStatementService()
      .subscribe((res) => {
        console.log(res);
        this.statementList = res.body['humareNetajiKahein'];

      });
  }
  deleteStatement(id) {
    var result = confirm("Do you really want to delete?");
    if (result) {
      this.statementService.deleteStatementService(id)
        .subscribe((res) => {
          this.toastrService.success('Leader deleted Successfully', 'Success');
          this.getStatements();
        }, (error) => {
          this.toastrService.error('Failure deleing Leader', 'Failure');
        });
    }
  }
}
