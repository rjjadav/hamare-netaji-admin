import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


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

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.initStateForm();
  }

  initStateForm() {
    this.stateForm = this.formBuilder.group({
      name: ['', Validators.required],
      lat: ['', Validators.required],
      lon: ['', Validators.required],
      active: ['Active', Validators.required]
    });
  }

  addState(stateForm) {
    if (!stateForm.valid) {
      Object.keys(stateForm.controls).forEach(field => {
        const control = stateForm.get(field);
        control.markAsTouched({ onlySelf: true });
      })
    } else {
      this.httpClient.post('http://139.162.53.4/netaji/admin/addState', stateForm.value)
        .subscribe((res) => {
          console.log(res);
          // alert(res['message']);
          this.toastrService.success('State added Successfully', 'Success');
        }, error => {
          this.toastrService.error('please try after sometime', 'Failure');
        });
    }
  }

  /*onSubmit() {
    var token= localStorage.getItem("token");
    var headers = new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token")).result.access_token}` });
     var options = {
         headers: headers,
     };
    var url = 'http://139.162.53.4/netaji/admin/addState';
    var formData = JSON.stringify(this.model);
    return this.http.post(url, formData,options).subscribe(result => {
      console.log(result);
    }, error => {
      console.log('There was an error: ')
    });
  }


  get diagnostic() { return JSON.stringify(this.model); }



  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getstate();
  }
  getstate(){
    var token= localStorage.getItem("token");
    var headers = new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token")).result.access_token}` });
     var options = {
         headers: headers,
     };
    var url = "http://139.162.53.4/netaji/admin/getStates";
    var formData = JSON.stringify(this.model);
    return this.http.get(url,options).subscribe(result => {
      console.log(result);
    }, error => {
      console.log('There was an error: ')
    });
  }*/

}
