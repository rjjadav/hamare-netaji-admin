import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { error } from 'util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leader-profile',
  templateUrl: './leader-profile.component.html',
  styleUrls: ['./leader-profile.component.css']
})

export class LeaderProfileComponent implements OnInit {

  profileForm: FormGroup;
  idExist = false;
  profileData;
  uploader = new FileUploader({ itemAlias: 'photo' });
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initProfileForm();
    this.getProfile();
  }
  getProfile() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.httpClient.get(`http://139.162.53.4/netaji/admin/getProfiles?id=${params['id']}`)
          .subscribe((res) => {
            console.log(res);

            if (res && res['profiles'].length) {
              this.idExist = true;
              this.profileData = res['profiles'][0];
              if(this.profileData.profileDetails.posHelds.length>0){
                for(var i=0;i<this.profileData.profileDetails.posHelds.length;i++){
                  this.profileData.profileDetails.posHelds[i].from=new Date(this.profileData.profileDetails.posHelds[i].from);
                  this.profileData.profileDetails.posHelds[i].to=new Date(this.profileData.profileDetails.posHelds[i].to)
                }
              }
              this.profileForm.patchValue({
                sal: this.profileData.profileDetails.sal,
                firstName: this.profileData.profileDetails.firstName,
                middleName: this.profileData.profileDetails.middleName,
                lastName: this.profileData.profileDetails.lastName,
                position: this.profileData.profileDetails.position,
                organisation: this.profileData.profileDetails.organisation,
                age: this.profileData.profileDetails.age,
                state: this.profileData.profileDetails.state,
                placeOrAreaOfInterest: this.profileData.profileDetails.placeOrAreaOfInterest,
                qualifications: this.profileData.profileDetails.qualifications,
                occupation: this.profileData.profileDetails.occupation,
                fatherName: this.profileData.profileDetails.fatherName,
                motherName: this.profileData.profileDetails.motherName,
                dob: new Date(this.profileData.profileDetails.dob),
                placeOfBirth: this.profileData.profileDetails.placeOfBirth,
                maritalStatus: this.profileData.profileDetails.maritalStatus,
                spouseName: this.profileData.profileDetails.spouseName,
                dateOfMarriage:  new Date(this.profileData.profileDetails.dateOfMarriage),
                noOfChildren: this.profileData.profileDetails.noOfChildren,
                dateOfDeath: new Date(this.profileData.profileDetails.dateOfDeath),
                noOfCriminalCases: this.profileData.profileDetails.noOfCriminalCases,
                presentAddress: this.profileData.profileDetails.presentAddress,
                presentLandLine: this.profileData.profileDetails.presentLandLine,
                // permanentAddress:[],
                permanentAddressLandLine: this.profileData.profileDetails.permanentAddressLandLine,
                faxNo: this.profileData.profileDetails.faxNo,
                mobileNo: this.profileData.profileDetails.mobileNo,
                email: this.profileData.profileDetails.email,
                website: this.profileData.profileDetails.website,
                facebookLink: this.profileData.profileDetails.facebookLink,
                twitterLink: this.profileData.profileDetails.twitterLink,
                linkedinLink: this.profileData.profileDetails.linkedinLink,
                googlePlus: this.profileData.profileDetails.googlePlus,
                socialAndCulturalActivities: this.profileData.profileDetails.socialAndCulturalActivities,
                specialInterests: this.profileData.profileDetails.socialAndCulturalActivities,
                sports: this.profileData.profileDetails.sports,
                countriesVisted: this.profileData.profileDetails.countriesVisted,
                activities: this.profileData.profileDetails.activities,
                campaigns: this.profileData.profileDetails.campaigns,
                movements: this.profileData.profileDetails.movements,
                fundReleased: this.profileData.profileDetails.fundReleased,
                fundUtilised: this.profileData.profileDetails.fundUtilised,
                totalRecommendedWork: this.profileData.profileDetails.totalRecommendedWork,
                totalSanctionedWorks: this.profileData.profileDetails.totalSanctionedWorks,
                attendenceInHouse: this.profileData.profileDetails.attendenceInHouse,
                noOfQuestionRaised: this.profileData.profileDetails.noOfQuestionRaised,
                noOfAssurancesGivenByGovernment: this.profileData.profileDetails.noOfAssurancesGivenByGovernment,
                noOfBillIntroduced: this.profileData.profileDetails.noOfBillIntroduced,
                noOfDebates: this.profileData.profileDetails.noOfDebates,
                noOfSpecialMentionsMade: this.profileData.profileDetails.noOfSpecialMentionsMade,
                active: this.profileData.profileDetails.active,
                posHelds:this.profileData.profileDetails.posHelds
              });
              
            };
          }
          )
      }
    })
  }

  addProfile(profileForm) {

    if (!profileForm.valid) {
      Object.keys(profileForm.controls).forEach(field => {
        const control = profileForm.get(field);
        control.markAsTouched({ onlySelf: true });
        console.log(field + ":" + control.status)
      })
    } else {
      if (this.idExist) {
        this.updateLeader(profileForm);
      } else {
        this.createLeader(profileForm);
      }

    }
  }
  onFileSelected() {
    let file = this.uploader.queue[this.uploader.queue.length - 1]['file']['rawFile'];
  }
  updateLeader(profileForm) {
    let formValue = profileForm.value;
    formValue.id = this.profileData.id;
    formValue.active =  this.profileData.active;
    let  reqesrobj={
      profileDetails:formValue,
      id:this.profileData.id,
      active :  this.profileData.active
    }
    this.httpClient.post('http://139.162.53.4/netaji/admin/editProfile', reqesrobj)
      .subscribe((res) => {
        this.toastrService.success('Profile updated Successfully', 'Success');
       
      },(error)=>{
        this.toastrService.error('Failure updating Profile', 'Failure');
      
      });
  }

  createLeader(profileForm) {
    this.httpClient.post('http://139.162.53.4/netaji/admin/createProfile', profileForm.value)
      .subscribe((res) => {
        // console.log(res);
        this.toastrService.success('Profile added Successfully', 'Success');
      }, error => {
        this.toastrService.error('Failure adding Profile', 'Failure');
      });
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
      mobileNo: [null, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      email: [null, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')],
      website: [null, Validators.pattern('^(http|https)?(://)?(www|ftp)?.?[a-z0-9-]+(.|:)([a-z0-9-]+)+([/?].*)?$')],
      facebookLink: [null, Validators.pattern('^(https?:\/\/)?((w{3}\.)?)facebook\.com\/(#!\/)?[a-z0-9_]+$')],
      twitterLink: [null, Validators.pattern('^(https?:\/\/)?((w{3}\.)?)twitter\.com\/(#!\/)?[a-z0-9_]+$')],
      linkedinLink: [null, Validators.pattern('^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$')],
      googlePlus: [null, Validators.pattern('^https:\/\/plus.google\.com\/.*$')],
      socialAndCulturalActivities: [''],
      specialInterests: [''],
      sports: [''],
      countriesVisted: [''],
      activities: [''],
      campaigns: [''],
      movements: [''],
      fundReleased: [null, Validators.pattern('^[0-9]*$')],
      fundUtilised: [null, Validators.pattern('^[0-9]*$')],
      totalRecommendedWork: [null, Validators.pattern('^[0-9]*$')],
      totalSanctionedWorks: [null, Validators.pattern('^[0-9]*$')],
      attendenceInHouse: [null, Validators.pattern('^[0-9]*$')],
      noOfQuestionRaised: [null, Validators.pattern('^[0-9]*$')],
      noOfAssurancesGivenByGovernment: [null, Validators.pattern('^[0-9]*$')],
      noOfBillIntroduced: [null, Validators.pattern('^[0-9]*$')],
      noOfDebates: [null, Validators.pattern('^[0-9]*$')],
      noOfSpecialMentionsMade: [null, Validators.pattern('^[0-9]*$')],
      active: ['Active', Validators.required],
      posHelds: this.formBuilder.array([this.formBuilder.group({ from: null, to: null, held: '' })])
    });
  }
  get posHelds() {
    return this.profileForm.get('posHelds') as FormArray;
  }

  addPosition() {
    this.posHelds.push(this.formBuilder.group({ from: null, to: null, held: '' }));

  }
  addPositionByget(obj) {
    this.posHelds.push(this.formBuilder.group(obj));

  }
  deletePosition(index) {
    if (index > 0) {
      this.posHelds.removeAt(index);
    }
  }
}
export class posHelds {
  from: Date
  to: Date
  held: string
}
