import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderProfileComponent } from './leader-profile.component';

describe('LeaderProfileComponent', () => {
  let component: LeaderProfileComponent;
  let fixture: ComponentFixture<LeaderProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
