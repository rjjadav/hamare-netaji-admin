import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorage } from 'ngx-store';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading:boolean =  false;

  constructor(
    private router: Router,
    private user: UserService,
    private http: HttpClient,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')])],
      password: ['', Validators.required],
    });
  }

  loginUser(loginForm) {
    if(!loginForm.valid){
      Object.keys(loginForm.controls).forEach(field => {
        const control = loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
      })
    }else {
      this.loading = true;
      const url = `http://139.162.53.4/netaji/oauth/token?client_id=finnov&client_secret=finnov&grant_type=password&password=${loginForm.value.password}&username=${loginForm.value.email}`;
      return this.http.get(url).subscribe(result => {
        this.user.setUserLoggedIn();
        window.localStorage.setItem('token', JSON.stringify({ result }));
        this.router.navigate(['dashboard']);
        this.loading = false;

        // console.log(result);
      }, error =>{
        this.loading = false;
        this.toastrService.error('Invalid Email or Password', 'Failure');
      });
    }
  }


}
