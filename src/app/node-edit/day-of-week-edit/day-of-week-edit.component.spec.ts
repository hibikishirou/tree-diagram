import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOfWeekEditComponent } from './day-of-week-edit.component';

describe('DayOfWeekEditComponent', () => {
  let component: DayOfWeekEditComponent;
  let fixture: ComponentFixture<DayOfWeekEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayOfWeekEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayOfWeekEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
