import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorage } from 'ngx-store';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private user: UserService, private http: HttpClient) { }

  ngOnInit() {
  }
  loginUser(e) {
    e.preventDefault();
    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;
    //console.log(username,password);

    var url = "http://139.162.53.4/netaji/oauth/token?client_id=finnov&client_secret=finnov&grant_type=password&password=" + password + "&username=" + username;
    return this.http.get(url).subscribe(result => {
      this.user.setUserLoggedIn();
      this.router.navigate(['dashboard']);
      localStorage.setItem('token', JSON.stringify({ result }));
      console.log(result);
    }, error =>{
      console.log('There was an error: ')
    });
  }

}
