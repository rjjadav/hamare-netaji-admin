import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-select-party',
  templateUrl: './select-party.component.html',
  styleUrls: ['./select-party.component.css']
})
export class SelectPartyComponent implements OnInit {
  partyForm: FormGroup;
  status = ['Active', 'Inactive'];
  submitted = false;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.initPartyForm();
  }

  initPartyForm() {
    this.partyForm = this.formBuilder.group({
      name: [ null, Validators.required],
      active: [null, Validators.required]
    })
  }
  addParty(formValues) {
    this.httpClient.post('http://139.162.53.4/netaji/admin/addParty', formValues)
      .subscribe((res) => {
        this.toastrService.success('Party added sucessfully', 'Success');
      });
  }
}
