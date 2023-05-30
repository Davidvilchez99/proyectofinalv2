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
  filtroValoracion: string = ""; // Asignar una cadena vacía por defecto
  comentariosFiltrados: any[] = []; // Variable para almacenar los comentarios filtrados

  constructor(datosService: DatosService, public Usuario: AuthService) {
    datosService.getComentarios().subscribe((datos) => {
      this.datos = datos;
      this.filtrarComentarios(); // Filtrar los comentarios inicialmente
    });
  }


  // filtrarComentarios() {
  //   if (this.filtroValoracion === null) {
  //     this.comentariosFiltrados = this.datos; // Mostrar todos los comentarios si no hay filtro aplicado
  //   } else {
  //     // Filtrar los comentarios por valoración
  //     this.comentariosFiltrados = this.datos.filter((comentario) => {
  //       const valoracion = parseInt(comentario.valoracion, 10); // Convertir a número entero
  //       return valoracion === this.filtroValoracion || valoracion > this.filtroValoracion;
  //     });
  //   }
  // }
  filtrarComentarios() {
    if (this.filtroValoracion === "") { // Comprobar si el filtro está vacío
      this.comentariosFiltrados = this.datos;
    } else {
      this.comentariosFiltrados = this.datos.filter((comentario) => comentario.valoracion === this.filtroValoracion);
    }
  }
  
  
}
