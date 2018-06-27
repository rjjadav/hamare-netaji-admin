import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-interview',
  templateUrl: './add-interview.component.html',
  styleUrls: ['./add-interview.component.css']
})
export class AddInterviewComponent implements OnInit {
  interviewForm: FormGroup;
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initInterviewForm();
  }

  initInterviewForm() {
    this.interviewForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      youtubeLink: [],
      thumbNailImage: [],
      sequence: [],
      active: [null, Validators.required]
    })
  }
  addInterview(formValues) {
    console.log(formValues);
    const token = JSON.parse(window.localStorage.getItem('token')).result;
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${token['access_token']}` });
    let options = {
      'headers': headers
    }
    this.httpClient.post('http://139.162.53.4/netaji/admin/addInterview', formValues, options)
      .subscribe((res) => {
        alert(res['message']);
      })
  }

}
