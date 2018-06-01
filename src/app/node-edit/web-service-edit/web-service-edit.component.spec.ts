import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebServiceEditComponent } from './web-service-edit.component';

describe('WebServiceEditComponent', () => {
  let component: WebServiceEditComponent;
  let fixture: ComponentFixture<WebServiceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebServiceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebServiceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
