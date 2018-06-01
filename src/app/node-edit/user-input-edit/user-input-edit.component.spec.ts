import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInputEditComponent } from './user-input-edit.component';

describe('UserInputEditComponent', () => {
  let component: UserInputEditComponent;
  let fixture: ComponentFixture<UserInputEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInputEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInputEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
