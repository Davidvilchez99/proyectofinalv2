import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent {

  constructor(public Usuario: AuthService, public router: Router) { }

  ngOnInit(): void {
    window.onscroll = () => {
      this.scrollFunction();
    };
  }

  scrollFunction() {
    const scrollToTopButton = document.getElementById("scrollToTopButton");
    if (scrollToTopButton) {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopButton.style.display = "block";
      } else {
        scrollToTopButton.style.display = "none";
      }
    }
  }

  scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  cerrarSesion(){
    this.Usuario.cerrarSesion();

    this.router.navigate(['']);
  }
}
