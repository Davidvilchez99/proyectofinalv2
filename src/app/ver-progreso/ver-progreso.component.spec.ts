import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProgresoComponent } from './ver-progreso.component';

describe('VerProgresoComponent', () => {
  let component: VerProgresoComponent;
  let fixture: ComponentFixture<VerProgresoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerProgresoComponent]
    });
    fixture = TestBed.createComponent(VerProgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
