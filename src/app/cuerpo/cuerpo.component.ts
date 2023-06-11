import { Component } from '@angular/core';
import { DatosService } from '../datos.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
  styleUrls: ['./cuerpo.component.scss']
})
export class CuerpoComponent {
  comentarios: any[] = [];
  isDragging: boolean = false;

  constructor(datosService: DatosService, public Usuario : AuthService) {

    datosService.getComentarios().subscribe((datos) => {
      // obtiene los comentarios con valoracion 4 o 5
      for (let index = 0; index < datos.length; index++) {
        if (datos[index].valoracion == "5" || datos[index].valoracion == "4") {
        this.comentarios.push(datos[index]);
        }
      }
      // this.comentarios = datos;

      
  }); 
  
}
}
