import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartEmployeesComponent } from './pie-chart-employees.component';

describe('PieChartEmployeesComponent', () => {
  let component: PieChartEmployeesComponent;
  let fixture: ComponentFixture<PieChartEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChartEmployeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieChartEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
