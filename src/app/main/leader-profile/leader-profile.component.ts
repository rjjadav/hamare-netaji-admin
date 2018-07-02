import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { error } from 'util';

@Component({
  selector: 'app-leader-profile',
  templateUrl: './leader-profile.component.html',
  styleUrls: ['./leader-profile.component.css']
})

export class LeaderProfileComponent implements OnInit {

  profileForm: FormGroup;
  uploader = new FileUploader({ itemAlias: 'photo'});
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.initProfileForm();
  }

  addProfile(profileForm) {

    if (!profileForm.valid) {
      Object.keys(profileForm.controls).forEach(field => {
        const control = profileForm.get(field);
        control.markAsTouched({ onlySelf: true });
      })
    } else {
    this.httpClient.post('http://139.162.53.4/netaji/admin/createProfile', profileForm.value)
      .subscribe((res) => {
        // console.log(res);
        this.toastrService.success('Profile added Successfully', 'Success');
      },error=>{
        this.toastrService.error('Failure adding Profile', 'Failure');
      });
    }
  }
  onFileSelected() {
    let file= this.uploader.queue[this.uploader.queue.length-1]['file']['rawFile'];
  }


  initProfileForm() {
    this.profileForm = this.formBuilder.group({
      sal: [null, Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      // position: ['', Validators.required], field is commented
      position: [null],
      organisation: ['', Validators.required],
      age: [18, Validators.required],
      state: ['', Validators.required],
      placeOrAreaOfInterest: ['', Validators.required],
      qualifications: [],
      occupation: [],
      fatherName: [],
      motherName: [],
      dob: [new Date(), Validators.required],
      placeOfBirth: [new Date(), Validators.required],
      maritalStatus: [''],
      spouseName: [''],
      dateOfMarriage: [''],
      noOfChildren: [''],
      dateOfDeath: [null],
      noOfCriminalCases: [null],
      presentAddress: [''],
      presentLandLine: [''],
      // permanentAddress:[],
      permanentAddressLandLine: [''],
      faxNo: [''],
      mobileNo: [null,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      email: [null,Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')],
      website: [null,Validators.pattern('^(http|https)?(://)?(www|ftp)?.?[a-z0-9-]+(.|:)([a-z0-9-]+)+([/?].*)?$')],
      facebookLink: [null,Validators.pattern('^(https?:\/\/)?((w{3}\.)?)facebook\.com\/(#!\/)?[a-z0-9_]+$')],
      twitterLink: [null,Validators.pattern('^(https?:\/\/)?((w{3}\.)?)twitter\.com\/(#!\/)?[a-z0-9_]+$')],
      linkedinLink: [null,Validators.pattern('^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$')],
      googlePlus: [null,Validators.pattern('^https:\/\/plus.google\.com\/.*$')],
      socialAndCulturalActivities: [''],
      specialInterests: [''],
      sports: [''],
      countriesVisted: [''],
      activities: [''],
      campaigns: [''],
      movements: [''],
      fundReleased: [null,Validators.pattern('^[0-9]*$')],
      fundUtilised: [null,Validators.pattern('^[0-9]*$')],
      totalRecommendedWork: [null,Validators.pattern('^[0-9]*$')],
      totalSanctionedWorks: [null,Validators.pattern('^[0-9]*$')],
      attendenceInHouse: [null,Validators.pattern('^[0-9]*$')],
      noOfQuestionRaised: [null,Validators.pattern('^[0-9]*$')],
      noOfAssurancesGivenByGovernment: [null,Validators.pattern('^[0-9]*$')],
      noOfBillIntroduced: [null,Validators.pattern('^[0-9]*$')],
      noOfDebates: [null,Validators.pattern('^[0-9]*$')],
      noOfSpecialMentionsMade: [null,Validators.pattern('^[0-9]*$')],
      active: ['Active', Validators.required],
      posHelds: this.formBuilder.array([this.formBuilder.group({from:null,to:null,held:''})])
    });
  }
  get posHelds() {
    return this.profileForm.get('posHelds') as FormArray;
  }

  addPosition(){
    this.posHelds.push(this.formBuilder.group({from:null,to:null,held:''}));

  }

  deletePosition(index){
    if(index>0){
      this.posHelds.removeAt(index);
    }
  }
}
export class posHelds {
  from: Date
  to: Date
  held:string
}
