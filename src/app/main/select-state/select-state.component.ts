import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';


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
  ) {}

  ngOnInit() {
    this.initStateForm();
  }

  initStateForm() {
    this.stateForm = this.formBuilder.group({
      name: ['', Validators.required],
      lat: ['', Validators.required],
      lon: ['', Validators.required],
      active: ['', Validators.required]
    });
  }

  addState(formValues) {
    this.httpClient.post('http://139.162.53.4/netaji/admin/addState', formValues)
      .subscribe((res) => {
        console.log(res);
        // alert(res['message']);
        this.toastrService.success('State added Successfully', 'Success');
      });
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
