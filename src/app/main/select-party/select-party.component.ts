import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { PartyService } from '../../core/services/party.service';


@Component({
  selector: 'app-select-party',
  templateUrl: './select-party.component.html',
  styleUrls: ['./select-party.component.css']
})
export class SelectPartyComponent implements OnInit {
  partyForm: FormGroup;
  status = ['Active', 'Inactive'];
  submitted = false;
  idExist = false;
  loading: boolean = false;
  partyData;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private partyService: PartyService
  ) { }

  ngOnInit() {
    this.initPartyForm();
    this.getParty();
  }

  initPartyForm() {
    this.partyForm = this.formBuilder.group({
      name: [null, Validators.required],
      active: [null, Validators.required]
    })
  }

  getParty() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.partyService.getPartyByIDService(params['id'])
          .subscribe((res) => {
            if (res && res.body['parties'].length) {
              this.idExist = true;
              this.partyData = res.body['parties'][0];
              this.partyForm.patchValue({
                name: this.partyData.name,
                active: this.partyData.active ? 'Active' : 'Inactive'
              });
            }
          })
      }
    })
  }

  addParty(partyForm) {
    if (!partyForm.valid) {
      Object.keys(partyForm.controls).forEach(field => {
        const control = partyForm.get(field);
        control.markAsTouched({ onlySelf: true });
      })
    } else {
      if (this.idExist) {
        this.editParty(partyForm);
      } else {
        this.createParty(partyForm);
      }
    }
  }

  createParty(partyForm) {
    this.loading = true;
    this.partyService.createPartyService(partyForm.value)
      .subscribe((res) => {
        this.toastrService.success('Party added Successfully', 'Success');
        this.loading = false;
      }, error => {
        this.toastrService.error('Failure updating Party', 'Failure');
        this.loading = false;
      });
  }

  editParty(partyForm) {
    this.loading = true;
    let formData = partyForm.value;
    formData.id = this.partyData.id;
    this.partyService.editPartyService(formData)
      .subscribe((res) => {
        this.toastrService.success('Party updated Successfully', 'Success');
        this.loading = false;
      }, error => {
        this.toastrService.error('Failure updating Party', 'Failure');
        this.loading = false;
      });
  }
}
