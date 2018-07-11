import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StateService } from '../../core/services/state.service';

@Component({
  selector: 'app-manage-states',
  templateUrl: './manage-states.component.html',
  styleUrls: ['./manage-states.component.css']
})
export class ManageStatesComponent implements OnInit {
  statesList;
  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.getStates();
  }

  getStates() {
    this.stateService.stateListService()
      .subscribe((res) => {

        this.statesList = res.body["states"];
      });
  }
  deleteState(id) {
    var result = confirm("Do you really want to delete?");
    if (result) {
      this.stateService.deleteStateService(id)
        .subscribe((res) => {
          this.toastrService.success('State deleted Successfully', 'Success');
          this.getStates();
        }, (error) => {
          this.toastrService.error('Failure deleing State', 'Failure');
        });
    }
  }
}
