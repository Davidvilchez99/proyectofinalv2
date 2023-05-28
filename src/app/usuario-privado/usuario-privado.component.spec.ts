import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPrivadoComponent } from './usuario-privado.component';

describe('UsuarioPrivadoComponent', () => {
  let component: UsuarioPrivadoComponent;
  let fixture: ComponentFixture<UsuarioPrivadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioPrivadoComponent]
    });
    fixture = TestBed.createComponent(UsuarioPrivadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
