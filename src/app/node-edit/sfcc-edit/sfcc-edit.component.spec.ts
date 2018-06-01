import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfccEditComponent } from './sfcc-edit.component';

describe('SfccEditComponent', () => {
  let component: SfccEditComponent;
  let fixture: ComponentFixture<SfccEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfccEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfccEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
