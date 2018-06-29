import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
      youtubeLink: ['',Validators.compose([Validators.required,Validators.pattern('^(https?:\/\/)?((w{3}\.)?)youtube.com\/.*$')])],
      thumbNailImage: [''],
      sequence: ['', Validators.required],
      active: ['Active', Validators.required]
    });
  }
  addInterview(interviewForm) {
    if (!interviewForm.valid) {
      Object.keys(interviewForm.controls).forEach(field => {
        const control = interviewForm.get(field);
        control.markAsTouched({ onlySelf: true });
      })
    } else {
      this.httpClient.post('http://139.162.53.4/netaji/admin/addInterview', interviewForm.value)
        .subscribe((res) => {
          this.toastrService.success('Interview added Successfully', 'Success');
        },(error)=>{
          this.toastrService.error('please try after sometime', 'Failure');
        });
    }
  }

}
