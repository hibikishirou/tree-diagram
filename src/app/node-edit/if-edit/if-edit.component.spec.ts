import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IfEditComponent } from './if-edit.component';

describe('IfEditComponent', () => {
  let component: IfEditComponent;
  let fixture: ComponentFixture<IfEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IfEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IfEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
