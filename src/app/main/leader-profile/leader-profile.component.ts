import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-leader-profile',
  templateUrl: './leader-profile.component.html',
  styleUrls: ['./leader-profile.component.css']
})
export class LeaderProfileComponent implements OnInit {
  profileForm: FormGroup;
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.initProfileForm();
  }

  addProfile(formValues) {
    formValues['posHelds'] = [
      {
        from: new Date(),
        to: new Date(),
        held: 'asdadasd'
      }
    ];

    this.httpClient.post('http://139.162.53.4/netaji/admin/createProfile', formValues)
      .subscribe((res) => {
        // console.log(res);
        this.toastrService.success('Profile added Successfully', 'Success');
      });
  }
  initProfileForm() {
    this.profileForm = this.formBuilder.group({
      sal: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      organisation: ['', Validators.required],
      age: [18, Validators.required],
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
      noOfChildren: [''],
      dateOfDeath: [null],
      noOfCriminalCases: [null],
      presentAddress: [''],
      presentLandLine: [''],
      // permanentAddress:[],
      permanentAddressLandLine: [''],
      faxNo: [''],
      mobileNo: [''],
      email: [''],
      website: [''],
      facebookLink: [''],
      twitterLink: [''],
      linkedinLink: [''],
      googlePlus: [''],
      socialAndCulturalActivities: [''],
      specialInterests: [''],
      sports: [''],
      countriesVisted: [''],
      activities: [''],
      campaigns: [''],
      movements: [''],
      fundReleased: [''],
      fundUtilised: [''],
      totalRecommendedWork: [''],
      totalSanctionedWorks: [''],
      attendenceInHouse: [''],
      noOfQuestionRaised: [''],
      noOfAssurancesGivenByGovernment: [''],
      noOfBillIntroduced: [''],
      noOfDebates: [''],
      noOfSpecialMentionsMade: [''],
      active: ['Active', Validators.required]
    });
  }
}
