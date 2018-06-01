import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RerouteEditComponent } from './reroute-edit.component';

describe('RerouteEditComponent', () => {
  let component: RerouteEditComponent;
  let fixture: ComponentFixture<RerouteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RerouteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RerouteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
