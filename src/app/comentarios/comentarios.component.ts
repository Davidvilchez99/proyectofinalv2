import { Component } from '@angular/core';
import { DatosService } from '../datos.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent {

  datos: any[] = [];
  
    constructor(datosService: DatosService, public Usuario : AuthService) {



      datosService.getComentarios().subscribe((datos) => {
        this.datos = datos;
        console.log(this.datos);
    }); 
     }
}
