import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredReturnComponent } from './expired-return.component';

describe('ExpiredReturnComponent', () => {
  let component: ExpiredReturnComponent;
  let fixture: ComponentFixture<ExpiredReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpiredReturnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpiredReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
