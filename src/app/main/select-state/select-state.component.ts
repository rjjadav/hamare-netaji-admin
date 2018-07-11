import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../core/services/state.service';


@Component({
  selector: 'app-select-state',
  templateUrl: './select-state.component.html',
  styleUrls: ['./select-state.component.css']
})
// const headers = new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem('token')).access_token}` });
// const options = {
//   headers: headers,
// };
export class SelectStateComponent implements OnInit {

  stateForm: FormGroup;
  idExist: boolean = false;
  loading: boolean = false;
  stateData;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private stateService: StateService,
  ) { }

  ngOnInit() {
    this.initStateForm();
    this.getState();
  }

  initStateForm() {
    this.stateForm = this.formBuilder.group({
      name: ['', Validators.required],
      lat: ['', Validators.required],
      lon: ['', Validators.required],
      active: ['Active', Validators.required]
    });
  }

  getState() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.stateService.getStateService(params['id'])
          .subscribe((res) => {
            if (res && res.body.states.length) {
              this.idExist = true;
              this.stateData = res.body.states[0];
              this.stateForm.patchValue({
                name: this.stateData.name,
                lat: this.stateData.lat,
                lon: this.stateData.lon,
                active: this.stateData.active ? 'Active' : 'Inactive'
              })
            }
          });
      }
    })
  }

  addState(stateForm) {
    if (!stateForm.valid) {
      Object.keys(stateForm.controls).forEach(field => {
        const control = stateForm.get(field);
        control.markAsTouched({ onlySelf: true });
      })
    } else {
      if (this.idExist) {
        this.editState(stateForm);
      } else {
        this.createState(stateForm);
      }
    }
  }

  createState(stateForm) {
    this.loading = true;
    this.stateService.createStateService(stateForm.value)
      .subscribe((res) => {
        console.log(res);
        this.toastrService.success('State added Successfully', 'Success');
        this.loading = false;
      }, error => {
        this.toastrService.error('Failure adding State', 'Failure');
        this.loading = false;
      });
  }

  editState(stateForm) {
    this.loading = true;
    let formValue = stateForm.value;
    formValue.id = this.stateData.id;
    // formValue.createdOn = this.stateData.createdOn;
    formValue.active = stateForm.value.active.toLowerCase() === 'active';
    this.stateService.editStateService(formValue)
      .subscribe((res) => {
        this.toastrService.success('State updated Successfully', 'Success');
        this.loading = false;
      }, error => {
        this.toastrService.error('Failure updating State', 'Failure');
        this.loading = false;
      });
  }
}
