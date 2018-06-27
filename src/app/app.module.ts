import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SelectStateComponent } from './select-state/select-state.component';
import { SelectPartyComponent } from './select-party/select-party.component';
import { ManageStatesComponent } from './manage-states/manage-states.component';
import { LeaderProfileComponent } from './leader-profile/leader-profile.component';
import { AddInterviewComponent } from './add-interview/add-interview.component';
import { HamareNetajiKahenComponent } from './hamare-netaji-kahen/hamare-netaji-kahen.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StateListComponent } from './state-list/state-list.component';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {PartyListComponent} from './party-list/party-list.component';
import {InterviewListComponent} from './interview-list/interview-list.component';
const appRoutes:Routes = [
  {
  path : '',
  component : LoginComponent
  },
  {
  path : 'dashboard',
  canActivate: [AuthGuard],
  component : DashboardComponent
  },
  {
    path : 'select-state',
    component : SelectStateComponent
  },
  {
    path : 'stateList',
    component : StateListComponent
  },
  {
    path : 'select-party',
    component : SelectPartyComponent
  },
  {
    path : 'manage-states',
    component : ManageStatesComponent
  },
  {
    path : 'leader-profile',
    component : LeaderProfileComponent
  },
  {
    path : 'add-interview',
    component : AddInterviewComponent
  },
  {
    path : 'hamare-netaji-kahen',
    component : HamareNetajiKahenComponent
  }
]

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
    StateListComponent,
    PartyListComponent,
    InterviewListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BsDatepickerModule.forRoot()
  ],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
