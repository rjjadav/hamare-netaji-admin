import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-leader-profile',
  templateUrl: './leader-profile.component.html',
  styleUrls: ['./leader-profile.component.css']
})
export class LeaderProfileComponent implements OnInit {
  profileForm: FormGroup;
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
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

    const token = JSON.parse(window.localStorage.getItem('token')).result;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token['access_token']}`});
    const options = {
      'headers': headers
    };
    this.httpClient.post('http://139.162.53.4/netaji/admin/createProfile', formValues, options)
      .subscribe((res) => {
        // console.log(res);
        alert('Profile added Successfully');
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
