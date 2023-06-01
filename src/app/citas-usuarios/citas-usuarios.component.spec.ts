import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasUsuariosComponent } from './citas-usuarios.component';

describe('CitasUsuariosComponent', () => {
  let component: CitasUsuariosComponent;
  let fixture: ComponentFixture<CitasUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitasUsuariosComponent]
    });
    fixture = TestBed.createComponent(CitasUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
