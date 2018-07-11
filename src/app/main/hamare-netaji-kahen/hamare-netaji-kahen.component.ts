import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { StatementService } from '../../core/services/statement.service';


@Component({
  selector: 'app-hamare-netaji-kahen',
  templateUrl: './hamare-netaji-kahen.component.html',
  styleUrls: ['./hamare-netaji-kahen.component.css']
})
export class HamareNetajiKahenComponent implements OnInit {

  hnkForm: FormGroup;
  idExist;
  statementData;
  constructor(private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private statementService: StatementService) { }

  ngOnInit() {
    this.initStateForm();
    this.getStatementsDetails();
  }
  initStateForm() {
    this.hnkForm = this.formBuilder.group({
      title: [null, Validators.required],
      descriptions: [null, Validators.required],
      leadersName: [null, Validators.required],
      active: [null, Validators.required]
    });
  }
  addHNK(hnkForm) {
    if (!hnkForm.valid) {
      Object.keys(hnkForm.controls).forEach(field => {
        const control = hnkForm.get(field);
        control.markAsTouched({ onlySelf: true });
      })
    } else {
      if (this.idExist) {
        this.updateStatement(hnkForm);
      } else {
        this.createStatement(hnkForm);
      }

    }
  }
  getStatementsDetails() {
    this.activatedRoute.params.subscribe(params => {

      if (params['id']) {
        this.statementService.getStatementByIDService(params['id'])
          .subscribe((res) => {
            if (res && res.body['humareNetajiKahein'].length) {
              this.idExist = true;
              let data = res.body['humareNetajiKahein'][0];
              this.statementData = data;
              this.hnkForm.patchValue({
                title: data.title,
                descriptions: data.descriptions,
                leadersName: data.leadersName,
                active: (data.active ? 'Active' : 'Inactive')
              });
            }
          });
      }
    })
  }
  updateStatement(hnkForm) {
    var requestobj = hnkForm.value;
    requestobj.createdOn = this.statementData.createdOn;
    requestobj.id = this.statementData.id;
    requestobj.active = requestobj.active === 'Active' ? true : false;
    this.statementService.editStatementService(requestobj)
      .subscribe((res) => {
        this.toastrService.success('Statement added Successfully', 'Success');

      }, (error) => {
        this.toastrService.error('Failure adding Statement', 'Failure');

      });
  }
  createStatement(hnkForm) {
    this.statementService.createStatementService(hnkForm.value)
      .subscribe((res) => {
        this.toastrService.success('Statement added Successfully', 'Success');

      }, (error) => {
        this.toastrService.error('Failure adding Statement', 'Failure');

      });
  }
}
