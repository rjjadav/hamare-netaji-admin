import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { error } from 'util';
import { ActivatedRoute } from '@angular/router';
import { LeaderProfileService } from '../../core/services/leaderprofile.service';
@Component({
  selector: 'app-leader-profile',
  templateUrl: './leader-profile.component.html',
  styleUrls: ['./leader-profile.component.css']
})

export class LeaderProfileComponent implements OnInit {

  profileForm: FormGroup;
  idExist = false;
  profileData;
  uploader: FileUploader = new FileUploader({ url: '' });
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private leaderProfileService: LeaderProfileService
  ) { }

  ngOnInit() {
    this.initProfileForm();
    this.getProfile();
  }

  onFileSelected() {
    if (this.uploader.queue.length) {
      let file = this.uploader.queue[this.uploader.queue.length - 1];
      console.log(file);
      let fileReader = new FileReader();

      fileReader.onload = (e) => {
        let imageData = fileReader.result;
        // console.log(imageData);
        if (imageData.length) {
          this.profileForm.patchValue({
            profilePic: imageData.split(',')[1]
          });
        }
      }
      fileReader.readAsDataURL(file._file);


    }
  }

  getProfile() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.leaderProfileService.getLeaderProfileByIDService(params['id'])
          .subscribe((res) => {
            console.log(res);

            if (res && res.body['profiles'].length) {
              this.idExist = true;
              this.profileData = res.body['profiles'][0];
              if (this.profileData.profileDetails.posHelds.length > 0) {
                for (var i = 0; i < this.profileData.profileDetails.posHelds.length; i++) {
                  this.profileData.profileDetails.posHelds[i].from = new Date(this.profileData.profileDetails.posHelds[i].from);
                  this.profileData.profileDetails.posHelds[i].to = new Date(this.profileData.profileDetails.posHelds[i].to)
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
                dateOfMarriage: new Date(this.profileData.profileDetails.dateOfMarriage),
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
                posHelds: this.profileData.profileDetails.posHelds
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
      })
    } else {
      if (this.idExist) {
        this.updateLeader(profileForm);
      } else {
        this.createLeader(profileForm);
      }

    }
  }

  updateLeader(profileForm) {
    let formValue = profileForm.value;
    let requestOBJ = {
      "profile": {
        "profileDetails": formValue,
        "id": this.profileData.id,
        "active": this.profileData.active
      }
    }
    this.leaderProfileService.editLeaderProfileService(requestOBJ)
      .subscribe((res) => {
        this.toastrService.success('Profile updated Successfully', 'Success');
        this.initProfileForm();
      }, (error) => {
        this.toastrService.error('Failure updating Profile', 'Failure');

      });
  }

  resetform() {

  }

  createLeader(profileForm) {
    this.leaderProfileService.createLeaderProfileService(profileForm.value)
      .subscribe((res) => {
        // console.log(res);
        this.initProfileForm();
        this.toastrService.success('Profile added Successfully', 'Success');
      }, error => {
        this.toastrService.error('Failure adding Profile', 'Failure');
      });
  }

  initProfileForm() {
    this.profileForm = this.formBuilder.group({
      profilePic: [null],
      sal: [null, Validators.required],
      firstName: ['', Validators.required],
      middleName: [null],
      lastName: ['', Validators.required],
      // position: ['', Validators.required], field is commented
      position: [null],
      organisation: ['', Validators.required],
      age: [0, Validators.required],
      state: ['', Validators.required],
      placeOrAreaOfInterest: ['', Validators.required],
      qualifications: [],
      occupation: [],
      fatherName: [],
      motherName: [],
      dob: [new Date(), Validators.required],
      placeOfBirth: ['', Validators.required],
      maritalStatus: [''],
      spouseName: [''],
      dateOfMarriage: [''],
      noOfChildren: [null, Validators.min(0)],
      dateOfDeath: [null],
      noOfCriminalCases: [null, Validators.min(0)],
      presentAddress: [''],
      presentLandLine: [''],
      // permanentAddress:[],
      permanentAddressLandLine: [''],
      faxNo: [''],
      mobileNo: [null, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      email: [null, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')],
      website: [null, Validators.pattern('^(http|https)?(://)?(www|ftp)?.?[a-z0-9-]+(.|:)([a-z0-9-]+)+([/?].*)?$')],
      facebookLink: [null, Validators.pattern('^(https?:\/\/)?((w{3}\.)?)facebook.com\/(#!\/)?[a-z0-9_.]+$')],
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
  agecalculate(temp) {
    if (this.profileForm.value.dob != null) {
      let dateString = this.profileForm.value.dob.toString();
      let birthYear = new Date(dateString);
      var now = new Date();

      var nowMonth = now.getUTCMonth() + 1; //months from 1-12
      var nowDay = now.getUTCDate();
      var nowYear = now.getUTCFullYear();

      var myMonth_birth = birthYear.getUTCMonth();
      var myDay_birth = birthYear.getUTCDate();
      var myYear_birth = birthYear.getUTCFullYear();

      var birthAge = nowYear - myYear_birth - 1;//not ur age yet

      if (nowMonth >= myMonth_birth) //means ur birth month is now or passed
        if (nowDay >= myDay_birth)//check if the day is now or passed
          birthAge += 1;
      const age = this.profileForm.get('age');
      age.setValue(birthAge);
    } else {
      const age = this.profileForm.get('age');
      age.setValue(0);
    }
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
