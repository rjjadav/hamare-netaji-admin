import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { UserService } from './core/services/user.service';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SelectStateComponent } from './main/select-state/select-state.component';
import { SelectPartyComponent } from './main/select-party/select-party.component';
import { ManageStatesComponent } from './main/manage-states/manage-states.component';
import { LeaderProfileComponent } from './main/leader-profile/leader-profile.component';
import { AddInterviewComponent } from './main/add-interview/add-interview.component';
import { HamareNetajiKahenComponent } from './main/hamare-netaji-kahen/hamare-netaji-kahen.component';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {PartyListComponent} from './main/party-list/party-list.component';
import {InterviewListComponent} from './main/interview-list/interview-list.component';
import { MainComponent } from './main/main.component';
import {routes} from './routes';
import { AuthComponent } from './auth/auth.component';
import {InterceptorService} from './core/config/interceptor.service';
import {ToastrModule} from 'ngx-toastr';
import { AuthGuard } from './core/config/auth.guard';
import {FileUploadModule} from 'ng2-file-upload';
import{LeaderListComponent} from './main/leader-list/leader-list.component';
import {HamareNetajiKahenListComponent} from './main/hamare-netaji-kahen-list/hamare-netaji-kahen-list.component';
import { StateService } from './core/services/state.service';
import { InterviewService } from './core/services/interview.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidenavComponent,
    SelectStateComponent,
    SelectPartyComponent,
    ManageStatesComponent,
    LeaderProfileComponent,
    AddInterviewComponent,
    HamareNetajiKahenComponent,
    PartyListComponent,
    InterviewListComponent,
    MainComponent,
    AuthComponent,
    LeaderListComponent,
    HamareNetajiKahenListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes,{ useHash: true }),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(),
    FileUploadModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    AuthGuard,
    UserService,
    StateService,
    InterviewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
