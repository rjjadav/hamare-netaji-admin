import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-interview',
  templateUrl: './add-interview.component.html',
  styleUrls: ['./add-interview.component.css']
})
export class AddInterviewComponent implements OnInit {
  interviewForm: FormGroup;
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.initInterviewForm();
  }

  initInterviewForm() {
    this.interviewForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      youtubeLink: ['', Validators.required],
      thumbNailImage: ['', Validators.required],
      sequence: ['', Validators.required],
      active: [null, Validators.required]
    });
  }
  addInterview(formValues) {
    this.httpClient.post('http://139.162.53.4/netaji/admin/addInterview', formValues)
      .subscribe((res) => {
        this.toastrService.success('Interview added Successfully', 'Success');

      });
  }

}
