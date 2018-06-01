import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndEditComponent } from './end-edit.component';

describe('EndEditComponent', () => {
  let component: EndEditComponent;
  let fixture: ComponentFixture<EndEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
