import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hamare-netaji-kahen',
  templateUrl: './hamare-netaji-kahen.component.html',
  styleUrls: ['./hamare-netaji-kahen.component.css']
})
export class HamareNetajiKahenComponent implements OnInit {

  hnkForm: FormGroup;
  idExist;
  statementData;
  constructor(private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.initStateForm();
    this.getStatementsDetails();
  }
  initStateForm() {
    this.hnkForm = this.formBuilder.group({
      title: [null, Validators.required],
      descriptions: [null, Validators.required],
      leadersName: [null, Validators.required],
      active: [null, Validators.required]
    });
  }
  addHNK(hnkForm) {
    if (!hnkForm.valid) {
      Object.keys(hnkForm.controls).forEach(field => {
        const control = hnkForm.get(field);
        control.markAsTouched({ onlySelf: true });
      })
    } else {
      if(this.idExist) {
      this.updateStatement(hnkForm);
      }else{
        this.createStatement(hnkForm);
      }
      
    }
  }
  getStatementsDetails(){
    this.activatedRoute.params.subscribe(params => {

      if(params['id']){
        this.httpClient.get(`http://139.162.53.4/netaji/admin/getHumareNetajiKahein?id=${params['id']}`)
        .subscribe((res) => {
          if(res && res['humareNetajiKahein'].length) {
            this.idExist = true;
            let data = res['humareNetajiKahein'][0];
            this.statementData = data;
            this.hnkForm.patchValue({
              title: data.title,
              descriptions: data.descriptions,
              leadersName: data.leadersName,            
              active: (data.active ? 'Active' : 'Inactive')
            });
          }
        });
      }
    })
  }
  updateStatement(hnkForm){
    var requestobj=hnkForm.value;    
    requestobj.createdOn=this.statementData.createdOn;
    requestobj.id=this.statementData.id;
    requestobj.active = requestobj.active === 'Active' ? true : false;

    this.httpClient.post('http://139.162.53.4/netaji/admin/editHumareNetajiKahein', requestobj)
    .subscribe((res) => {
      this.toastrService.success('Statement added Successfully', 'Success');
     
    }, (error) => {
      this.toastrService.error('Failure adding Statement', 'Failure');
     
    });
  }
  createStatement(hnkForm) {
    this.httpClient.post('http://139.162.53.4/netaji/admin/addHumareNetajiKahein', hnkForm.value)
      .subscribe((res) => {
        this.toastrService.success('Statement added Successfully', 'Success');
       
      }, (error) => {
        this.toastrService.error('Failure adding Statement', 'Failure');
       
      });
  }
}
