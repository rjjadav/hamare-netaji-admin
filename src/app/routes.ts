import {Routes} from '@angular/router';
import { AuthGuard } from './core/config/auth.guard';

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
import{LeaderListComponent} from './main/leader-list/leader-list.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthComponent} from './auth/auth.component';
import {HamareNetajiKahenListComponent} from './main/hamare-netaji-kahen-list/hamare-netaji-kahen-list.component';



const mainRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'states', component: SelectStateComponent, canActivate: [AuthGuard] },
  { path: 'states/:id', component: SelectStateComponent, canActivate: [AuthGuard] },
  { path: 'stateList', component: ManageStatesComponent , canActivate: [AuthGuard]},

  { path: 'party', component: SelectPartyComponent , canActivate: [AuthGuard]},
  { path: 'party/:id', component: SelectPartyComponent , canActivate: [AuthGuard]},
  { path: 'partyList', component: PartyListComponent, canActivate: [AuthGuard] },

  { path: 'interview', component: AddInterviewComponent, canActivate: [AuthGuard] },
  { path: 'interview/:id', component: AddInterviewComponent, canActivate: [AuthGuard] },
  { path: 'interviewList', component: InterviewListComponent , canActivate: [AuthGuard]},

  { path: 'hnk', component: HamareNetajiKahenComponent , canActivate: [AuthGuard]},
  { path: 'hnk/:id', component: HamareNetajiKahenComponent , canActivate: [AuthGuard]},
  { path: 'hnklist', component: HamareNetajiKahenListComponent , canActivate: [AuthGuard]},
  { path: 'profile', component: LeaderProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: LeaderProfileComponent, canActivate: [AuthGuard] },
  { path: 'leaderlist', component: LeaderListComponent, canActivate: [AuthGuard] }
];

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];


export const routes: Routes = [
  { path : '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '', component: MainComponent, children: mainRoutes },
  { path: 'auth', component: AuthComponent, children: authRoutes }
];
