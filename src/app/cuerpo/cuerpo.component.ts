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
      this.comentarios = datos;
      console.log(this.comentarios);
  }); 
  
}
}
