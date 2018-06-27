import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SelectStateComponent } from './select-state/select-state.component';
import { SelectPartyComponent } from './select-party/select-party.component';
import { ManageStatesComponent } from './manage-states/manage-states.component';
import { LeaderProfileComponent } from './leader-profile/leader-profile.component';
import { AddInterviewComponent } from './add-interview/add-interview.component';
import { HamareNetajiKahenComponent } from './hamare-netaji-kahen/hamare-netaji-kahen.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
