import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlPlayEditComponent } from './url-play-edit.component';

describe('UrlPlayEditComponent', () => {
  let component: UrlPlayEditComponent;
  let fixture: ComponentFixture<UrlPlayEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlPlayEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlPlayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
