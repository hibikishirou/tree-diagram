import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreCallEditComponent } from './pre-call-edit.component';

describe('PreCallEditComponent', () => {
  let component: PreCallEditComponent;
  let fixture: ComponentFixture<PreCallEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreCallEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreCallEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
