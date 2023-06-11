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
    // guarda los comentarios en un array
    datosService.getComentarios().subscribe((datos) => {
      this.datos = datos;
      this.filtrarComentarios(); // Filtrar los comentarios inicialmente
    });
  }
  // funcion para filtrar los comentarios por valoracion
  filtrarComentarios() {
    if (this.filtroValoracion === "") { // Comprobar si el filtro está vacío
      this.comentariosFiltrados = this.datos;
    } else {
      this.comentariosFiltrados = this.datos.filter((comentario) => comentario.valoracion === this.filtroValoracion);
    }
  }
  
  
}
