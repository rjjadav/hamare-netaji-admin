import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HamareNetajiKahenComponent } from './hamare-netaji-kahen.component';

describe('HamareNetajiKahenComponent', () => {
  let component: HamareNetajiKahenComponent;
  let fixture: ComponentFixture<HamareNetajiKahenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HamareNetajiKahenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HamareNetajiKahenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
