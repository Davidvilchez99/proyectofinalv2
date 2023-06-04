import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { DatosService } from '../datos.service';
import { switchMap } from 'rxjs/operators';
import { EventInput } from '@fullcalendar/core';
import {CalendarControllerService} from '../calendar-controller.service';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-usuario-privado',
  templateUrl: './usuario-privado.component.html',
  styleUrls: ['./usuario-privado.component.scss']
})
export class UsuarioPrivadoComponent {
  
  citas: any[] = [];
  citasUsuarioAdministrador: any[] = [];
  citasUsuarioProfesional: any[] = [];
  dni: any;
  datos: any[] = [];
  usuarios: any[] = [];
  filteredUsuarios: any[] = [];
  filteredCites: any[] = [];
  filterText: string = '';
  filterCitesText: string = '';
  calendarOptions: CalendarOptions = {};


  constructor(public Usuario: AuthService, public datosService: DatosService, public calendarService: CalendarControllerService) {
    datosService.getUsuarios().subscribe((usuarios) => {
      for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].rol === 'paciente' || usuarios[i].rol === 'profesional') {
          if (!this.usuarios.find((user) => user.id === usuarios[i].id)) {
            this.usuarios.push(usuarios[i]);
          }
        }
      }
      this.filterUsuarios();
      this.filterCites();
      
      // this.calendarOptions = this.calendarService.getCalendarOptions();
    });
  }
  ngOnInit() {
    this.calendarOptions = this.calendarService.getCalendarOptions();
    this.Usuario.obtenerCitasUsuario(this.Usuario.dni, this.Usuario.rol).subscribe((citas) => {
      this.citasUsuarioProfesional = citas;
      this.filteredCites = this.citasUsuarioProfesional;
      console.log(this.citasUsuarioProfesional);
    });
  }

  

  filterUsuarios() {
    // console.log(this.filterText);
    // console.log(this.filteredUsuarios);

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

  filterCites() {
    // console.log(this.filterCitesText);
    // console.log(this.filteredCites);

    this.filteredCites = this.citasUsuarioProfesional.filter((cita) => {
      const filter = this.filterCitesText.toLowerCase();
      const nombre_paciente = cita.nombre_paciente.toLowerCase();
      const dni_paciente = cita.dni_paciente.toLowerCase();
      const fecha = cita.fecha.toLowerCase();

      return (
        nombre_paciente.includes(filter) ||
        dni_paciente.includes(filter) ||
        fecha.includes(filter)
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
