import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { DatosService } from '../datos.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-privado',
  templateUrl: './usuario-privado.component.html',
  styleUrls: ['./usuario-privado.component.scss']
})

export class UsuarioPrivadoComponent {
  citas: any[] = [];
  citasUsuarioAdministrador: any[] = [];
  dni: any;
  datos: any[] = [];
  usuarios: any[] = [];
  filteredUsuarios: any[] = [];
  filterText: string = '';

  constructor(public Usuario: AuthService, public datosService: DatosService) {
    datosService.getUsuarios().subscribe((usuarios) => {
      for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].rol === 'paciente' || usuarios[i].rol === 'profesional') {
          if (!this.usuarios.find((user) => user.id === usuarios[i].id)) {
            this.usuarios.push(usuarios[i]);
            console.log(this.usuarios);
          }
        }
      }
      this.filterUsuarios();
    });
  }

  filterUsuarios() {
    console.log(this.filterText);

    this.filteredUsuarios = this.usuarios.filter((usuario) => {
      const filter = this.filterText.toLowerCase();
      const nombre = usuario.nombre.toLowerCase();
      const apellidos = usuario.apellidos.toLowerCase();
      const dni = usuario.dni.toLowerCase();

      return (
        nombre.includes(filter) ||
        apellidos.includes(filter) ||
        dni.includes(filter)
      );
    });

  }

  verCitasUsuario(dni: string, nombre: string, apellidos: string, rol: string) {
    this.Usuario.obtenerCitasUsuario(dni, rol).subscribe((citas) => {
      this.citasUsuarioAdministrador = citas;
      console.log(this.citasUsuarioAdministrador);
    });
    const userCiteH3 = document.getElementById('user-cite-h3');
    if (userCiteH3) {

    userCiteH3.innerHTML = "Citas de " + nombre + " " + apellidos;

    }
  }

  borrarCita(citaId: string) {
    this.datosService.borrarCita(citaId);

  }
}