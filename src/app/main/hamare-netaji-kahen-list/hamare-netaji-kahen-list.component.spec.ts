import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HamareNetajiKahenListComponent } from './hamare-netaji-kahen-list.component';

describe('HamareNetajiKahenComponent', () => {
  let component: HamareNetajiKahenListComponent;
  let fixture: ComponentFixture<HamareNetajiKahenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HamareNetajiKahenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HamareNetajiKahenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
