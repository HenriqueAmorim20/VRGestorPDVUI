import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrEditRedeComponent } from './new-or-edit-rede.component';

describe('NewOrEditRedeComponent', () => {
  let component: NewOrEditRedeComponent;
  let fixture: ComponentFixture<NewOrEditRedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOrEditRedeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewOrEditRedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
