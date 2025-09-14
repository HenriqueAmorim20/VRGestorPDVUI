import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrEditLojaComponent } from './new-or-edit-loja.component';

describe('NewOrEditRedeComponent', () => {
  let component: NewOrEditLojaComponent;
  let fixture: ComponentFixture<NewOrEditLojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOrEditLojaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewOrEditLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
