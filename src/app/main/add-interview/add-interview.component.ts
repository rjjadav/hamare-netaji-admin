import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {FileUploader} from 'ng2-file-upload';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-interview',
  templateUrl: './add-interview.component.html',
  styleUrls: ['./add-interview.component.css']
})
export class AddInterviewComponent implements OnInit {
  interviewForm: FormGroup;
  uploader: FileUploader = new FileUploader({url: ''});
  idExist: boolean = false;
  loading: boolean = false;
  interviewData;
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initInterviewForm();
    this.getInterviewDetails();
  }

  initInterviewForm() {
    this.interviewForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      // youtubeLink: ['',Validators.compose([Validators.required,Validators.pattern('^(https?://)?(www\\\\.)?([-a-z0-9]{1,63}\\\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\\\.[a-z]{2,6}(/[-\\\\w@\\\\+\\\\.~#\\\\?&/=%]*)?$')])],
      youtubeLink: ['',Validators.compose([Validators.required,Validators.pattern('^(https?:\/\/)?((w{3}\.)?)youtube.com\/.*$')])],
      thumbNailImage: ['', Validators.required],
      sequence: ['', Validators.required],
      active: ['Active', Validators.required]
    });
  }


  getInterviewDetails() {
    this.activatedRoute.params.subscribe(params => {

      if(params['id']){
        this.httpClient.get(`http://139.162.53.4/netaji/admin/getInterview?id=${params['id']}`)
        .subscribe((res) => {
          if(res && res['interviews'].length) {
            this.idExist = true;
            let data = res['interviews'][0];
            this.interviewData = data;
            this.interviewForm.patchValue({
              title: data.title,
              description: data.description,
              youtubeLink: data.youtubeLink,
              thumbNailImage: data.thumbNailImage,
              sequence: data.sequence,
              active: (data.active ? 'Active' : 'Inactive')
            });
          }
        });
      }
    })
  }

  addInterview(interviewForm) {
    if (!interviewForm.valid) {
      Object.keys(interviewForm.controls).forEach(field => {
        const control = interviewForm.get(field);
        control.markAsTouched({ onlySelf: true });
      })
    } else {
      this.loading = true;

      if(this.idExist) {
        this.updateInterview(interviewForm);
      }else {
        this.createInterview(interviewForm);
      }
    }
  }

  createInterview(interviewForm) {
    this.httpClient.post('http://139.162.53.4/netaji/admin/addInterview', interviewForm.value)
      .subscribe((res) => {
        this.toastrService.success('Interview added Successfully', 'Success');
        this.loading = false;
      },(error)=>{
        this.toastrService.error('Failure adding Interview', 'Failure');
        this.loading = false;
      });
  }

  updateInterview(interviewForm) {
    let formValue = interviewForm.value;
    formValue.id = this.interviewData.id;
    formValue.createdOn = this.interviewData.createdOn;
    formValue.active = interviewForm.value.active.toLowerCase() === 'active';
    this.httpClient.post('http://139.162.53.4/netaji/admin/editInterview', formValue)
      .subscribe((res) => {
        this.toastrService.success('Interview Updated Successfully', 'Success');
        this.loading = false;
      },(error)=>{
        this.toastrService.error('Failure updating Interview', 'Failure');
        this.loading = false;
      });
  }

  onFileSelected() {
    if(this.uploader.queue.length) {
      let file = this.uploader.queue[this.uploader.queue.length - 1];
      console.log(file);
      let fileReader = new FileReader();

      fileReader.onload = (e) => {
        let imageData  = fileReader.result;
        // console.log(imageData);
        if(imageData.length) {
          this.interviewForm.patchValue({
            thumbNailImage : imageData
          })
        }
      }
      fileReader.readAsDataURL(file._file);


    }

  }

}
