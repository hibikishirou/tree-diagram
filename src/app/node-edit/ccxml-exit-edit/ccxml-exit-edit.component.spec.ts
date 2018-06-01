import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcxmlExitEditComponent } from './ccxml-exit-edit.component';

describe('CcxmlExitEditComponent', () => {
  let component: CcxmlExitEditComponent;
  let fixture: ComponentFixture<CcxmlExitEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcxmlExitEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcxmlExitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
