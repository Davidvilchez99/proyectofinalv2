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

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.dni = params.get('dni');
      this.datosService.getDatosUsuario(this.dni).subscribe((datos) => {
        this.datosUsuario = datos[0];
      });
    });

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



// @HostListener('document:mousedown', ['$event'])
  // onMouseDown(event: MouseEvent) {
  //   this.active = true;
  //   const target = event.target as HTMLElement;
  //   console.log(target);
  //   target.classList.add('scrolling');
  // }

  // @HostListener('document:mouseup')
  // onMouseUp() {
  //   this.active = false;
  //   const scroller = document.querySelector('.scroller');
  //   if (scroller instanceof HTMLElement) {
  //     scroller.classList.remove('scrolling');
  //   }
  // }

  // @HostListener('document:mouseleave')
  // onMouseLeave() {
  //   this.active = false;
  //   const scroller = document.querySelector('.scroller');
  //   if (scroller instanceof HTMLElement) {
  //     scroller.classList.remove('scrolling');
  //   }
  // }

  // @HostListener('document:mousemove', ['$event'])
  // onMouseMove(event: MouseEvent) {
  //   if (!this.active) return;
  //   const x = event.pageX - (document.querySelector('.wrapper')?.getBoundingClientRect()?.left || 0);
  //   this.scrollIt(x);
  // }

  // scrollIt(x: number) {
  //   const wrapper = document.querySelector('.wrapper');
  //   const after = document.querySelector('.after');
  //   const scroller = document.querySelector('.scroller');
  //   if (wrapper instanceof HTMLElement && after instanceof HTMLElement && scroller instanceof HTMLElement) {
  //     const transform = Math.max(0, Math.min(x, wrapper.offsetWidth));
  //     after.style.width = transform + 'px';
  //     scroller.style.left = transform - 25 + 'px';
  //   }
  // }

  // setOpeningState() {
  //   this.scrollIt(150);
  // }

  // @HostListener('document:touchstart', ['$event'])
  // onTouchStart(event: TouchEvent) {
  //   this.active = true;
  //   const target = event.target as HTMLElement;
  //   target.classList.add('scrolling');
  // }

  // @HostListener('document:touchend')
  // onTouchEnd() {
  //   this.active = false;
  //   const scroller = document.querySelector('.scroller');
  //   if (scroller instanceof HTMLElement) {
  //     scroller.classList.remove('scrolling');
  //   }
  // }

  // @HostListener('document:touchcancel')
  // onTouchCancel() {
  //   this.active = false;
  //   const scroller = document.querySelector('.scroller');
  //   if (scroller instanceof HTMLElement) {
  //     scroller.classList.remove('scrolling');
  //   }
  // }