import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayEditComponent } from './play-edit.component';

describe('PlayEditComponent', () => {
  let component: PlayEditComponent;
  let fixture: ComponentFixture<PlayEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
