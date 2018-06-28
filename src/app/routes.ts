import {Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {SelectStateComponent} from './main/select-state/select-state.component';
import {ManageStatesComponent} from './main/manage-states/manage-states.component';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {SelectPartyComponent} from './main/select-party/select-party.component';
import {PartyListComponent} from './main/party-list/party-list.component';
import {AddInterviewComponent} from './main/add-interview/add-interview.component';
import {InterviewListComponent} from './main/interview-list/interview-list.component';
import {HamareNetajiKahenComponent} from './main/hamare-netaji-kahen/hamare-netaji-kahen.component';
import {LeaderProfileComponent} from './main/leader-profile/leader-profile.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthComponent} from './auth/auth.component';


const mainRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'states', component: SelectStateComponent },
  { path: 'stateList', component: ManageStatesComponent },
  { path: 'party', component: SelectPartyComponent },
  { path: 'partyList', component: PartyListComponent },
  { path: 'interview', component: AddInterviewComponent },
  { path: 'interviewList', component: InterviewListComponent },
  { path: 'hnk', component: HamareNetajiKahenComponent },
  { path: 'profile', component: LeaderProfileComponent }
];

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];


export const routes: Routes = [
  { path : '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '', component: MainComponent, children: mainRoutes },
  { path: 'auth', component: AuthComponent, children: authRoutes }
];
