import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrEditPDVComponent } from './new-or-edit-pdv.component';

describe('NewOrEditRedeComponent', () => {
  let component: NewOrEditPDVComponent;
  let fixture: ComponentFixture<NewOrEditPDVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOrEditPDVComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewOrEditPDVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
