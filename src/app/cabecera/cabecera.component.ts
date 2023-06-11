import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent {
  
    constructor(public Usuario : AuthService, public router: Router) { 
      
    }
    // funcion para cerrar sesion y volver a la pagina de inicio
    cerrarSesion(){
      this.Usuario.cerrarSesion();

      this.router.navigate(['']);
    }
}
