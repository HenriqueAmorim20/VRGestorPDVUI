import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRedeComponent } from './list-rede.component';

describe('ListRedeComponent', () => {
  let component: ListRedeComponent;
  let fixture: ComponentFixture<ListRedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRedeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListRedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
