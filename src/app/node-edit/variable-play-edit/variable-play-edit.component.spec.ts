import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablePlayEditComponent } from './variable-play-edit.component';

describe('VariablePlayEditComponent', () => {
  let component: VariablePlayEditComponent;
  let fixture: ComponentFixture<VariablePlayEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariablePlayEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariablePlayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
