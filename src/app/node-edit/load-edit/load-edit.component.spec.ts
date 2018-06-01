import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadEditComponent } from './load-edit.component';

describe('LoadEditComponent', () => {
  let component: LoadEditComponent;
  let fixture: ComponentFixture<LoadEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
