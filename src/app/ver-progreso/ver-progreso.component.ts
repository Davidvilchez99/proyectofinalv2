import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatosService } from '../datos.service';

@Component({
  selector: 'app-ver-progreso',
  templateUrl: './ver-progreso.component.html',
  styleUrls: ['./ver-progreso.component.scss']
})
export class VerProgresoComponent implements OnInit, OnDestroy {
  datosUsuario: any;
  active = false;
  dni: any;
  private slider: HTMLInputElement | null = null;
  private frontImage: HTMLElement | null = null;

  constructor(private route: ActivatedRoute, private datosService: DatosService) { }

  // funcion para obtener los datos del usuario
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.dni = params.get('dni');
      this.datosService.getDatosUsuario(this.dni).subscribe((datos) => {
        this.datosUsuario = datos[0];
      });
    });

    // funcion para comparar dos imagenes y mostrar el progreso
    
    this.slider = document.getElementById('slider') as HTMLInputElement;
    this.frontImage = document.querySelector('.front-img');

    if (this.slider && this.frontImage) {
      this.addSliderEventListener();
    }
  }

  ngOnDestroy() {
    this.removeSliderEventListener();
  }

  addSliderEventListener() {
    const handleSliderInput = () => {
      if (this.frontImage) {
        this.frontImage.style.clipPath = `polygon(0 0, ${this.slider?.value}% 0, ${this.slider?.value}% 100%, 0% 100%)`;
      }
    };

    this.slider?.addEventListener('input', handleSliderInput);
  }

  removeSliderEventListener() {
    const handleSliderInput = () => {
      if (this.frontImage) {
        this.frontImage.style.clipPath = `polygon(0 0, ${this.slider?.value}% 0, ${this.slider?.value}% 100%, 0% 100%)`;
      }
    };

    this.slider?.removeEventListener('input', handleSliderInput);
  }
}