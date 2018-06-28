import { Component } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SelectStateComponent } from './main/select-state/select-state.component';
import { SelectPartyComponent } from './main/select-party/select-party.component';
import { ManageStatesComponent } from './main/manage-states/manage-states.component';
import { LeaderProfileComponent } from './main/leader-profile/leader-profile.component';
import { AddInterviewComponent } from './main/add-interview/add-interview.component';
import { HamareNetajiKahenComponent } from './main/hamare-netaji-kahen/hamare-netaji-kahen.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
