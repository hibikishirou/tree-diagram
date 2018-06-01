import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPlayEditComponent } from './dynamic-play-edit.component';

describe('DynamicPlayEditComponent', () => {
  let component: DynamicPlayEditComponent;
  let fixture: ComponentFixture<DynamicPlayEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicPlayEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicPlayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
