import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionDashboard } from './position-dashboard';

describe('PositionDashboard', () => {
  let component: PositionDashboard;
  let fixture: ComponentFixture<PositionDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
