import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-select-party',
  templateUrl: './select-party.component.html',
  styleUrls: ['./select-party.component.css']
})
export class SelectPartyComponent implements OnInit {
  partyForm: FormGroup;
  status = ['Active', 'Inactive'];

  // model = new Party('AAP', 'jhadu', 'blah@gmail.com', this.status[0]);

  submitted = false;

  onSubmit() { this.submitted = true; }


  // get diagnostic() { return JSON.stringify(this.model); }

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initPartyForm();
  }

  initPartyForm() {
    this.partyForm = this.formBuilder.group({
      name: [ null,Validators.required],
      active: [null, Validators.required]
    })
  }
  addParty(formValues) {
    console.log(formValues);
    const token = JSON.parse(window.localStorage.getItem('token')).result;
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${token['access_token']}`});
    let options = {
      'headers': headers
    }
    this.httpClient.post('http://139.162.53.4/netaji/admin/addParty', formValues, options)
      .subscribe((res) => {
        alert(res['message']);
      })
  }
}
