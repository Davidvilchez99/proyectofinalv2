import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearComentarioComponent } from './crear-comentario.component';

describe('CrearComentarioComponent', () => {
  let component: CrearComentarioComponent;
  let fixture: ComponentFixture<CrearComentarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearComentarioComponent]
    });
    fixture = TestBed.createComponent(CrearComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
