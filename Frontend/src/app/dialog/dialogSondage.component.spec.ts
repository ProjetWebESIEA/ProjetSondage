import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogSondageComponent } from './dialogSondage.component';

describe('DialogSondageComponent', () => {
  let component: DialogSondageComponent;
  let fixture: ComponentFixture<DialogSondageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSondageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSondageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
