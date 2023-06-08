import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { AuthService } from '../auth.service';
import { DatosService } from '../datos.service';
import { switchMap } from 'rxjs/operators';
import { EventInput } from '@fullcalendar/core';
import {CalendarControllerService} from '../calendar-controller.service';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar } from '@fullcalendar/core';


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
  filteredCitesProfesional: any[] = [];
  filteredCitesPaciente: any[] = [];
  filterText: string = '';
  filterCitesText: string = '';
  calendarOptions: CalendarOptions = {};
  isModalOpen: boolean = false;
  @ViewChild('modal') modal!: ElementRef<HTMLDivElement>;




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
      this.filterCitesPaciente();
      this.filterCitesProfesional();
      
      // this.calendarOptions = this.calendarService.getCalendarOptions();
    });
  }
  ngOnInit() {
    // this.calendarOptions = this.calendarService.getCalendarOptions();
    
    if (this.Usuario.rol === 'profesional') {
      this.Usuario.obtenerCitasUsuario(this.Usuario.dni, this.Usuario.rol).subscribe((citas) => {
        this.citasUsuarioProfesional = citas;
        this.filteredCitesProfesional = this.citasUsuarioProfesional;
        this.filteredCitesPaciente = this.citasUsuarioProfesional;
        const calendarElement = document.getElementById('calendar');
        if (calendarElement) {
          let calendar = new Calendar(calendarElement, {
            plugins: [dayGridPlugin],
            headerToolbar: {
              left: 'prev,next',
              center: 'title',
              right: 'dayGridMonth'
            },
            initialView: 'dayGridMonth',
            weekends: false,
            eventClick: (arg) => {
              const descripcion = arg.event.extendedProps["descripcion"];
              console.log(arg);
              this.openModal(arg, "profesionales");
            },
            dayMaxEvents: true,
            views: {
              dayGrid: {
                eventLimit: 3 // Especificar el límite de eventos antes de mostrar "+X More"
              },
            },
            events: this.citasUsuarioProfesional.map((cita) => {
              return {
                title: cita.nombre_paciente,
                date: cita.fecha+"T"+cita.hora,
                color: cita.color,
                descripcion: cita.descripcion,
                dni_paciente: cita.dni_paciente,
                fecha: cita.fecha,
                hora: cita.hora,
                precio: cita.precio,
                estado: cita.estado
              };
            }),
          });
          calendar.render();
        }
      });
    }
    else if (this.Usuario.rol === 'paciente') {
      this.Usuario.obtenerCitasUsuario(this.Usuario.dni, this.Usuario.rol).subscribe((citas) => {
        this.citasUsuarioProfesional = citas;
        this.filteredCitesProfesional = this.citasUsuarioProfesional;
        this.filteredCitesPaciente = this.citasUsuarioProfesional;

        const calendarElement = document.getElementById('calendar');
        if (calendarElement) {
          let calendar = new Calendar(calendarElement, {
            plugins: [dayGridPlugin],
            headerToolbar: {
              left: 'prev,next',
              center: 'title',
              right: 'dayGridMonth'
            },
            initialView: 'dayGridMonth',
            weekends: false,
            eventClick: (arg) => {
              const descripcion = arg.event.extendedProps["descripcion"];
              console.log(arg);
              // this.openModalPaciente(arg);
              this.openModal(arg, "pacientes");
            },
            dayMaxEvents: true,
            views: {
              dayGrid: {
                eventLimit: 3 // Especificar el límite de eventos antes de mostrar "+X More"
              },
            },
            events: this.citasUsuarioProfesional.map((cita) => {
              return {
                title: cita.nombre_profesional,
                date: cita.fecha+"T"+cita.hora,
                color: cita.color,
                descripcion: cita.descripcion,
                dni_profesional: cita.dni_profesional,
                fecha: cita.fecha,
                hora: cita.hora,
                precio: cita.precio,
                estado: cita.estado
              };
            }),
          });
          calendar.render();
        }
      });
    }
    
  }

  openModal(cita: any, tipo: string) {
    if (this.modal && tipo === "profesionales") {
      const modalTitle = document.getElementById('modal-title');
      const modalBody = document.getElementById('modal-body');
      if (modalTitle && modalBody) {
        modalTitle.innerHTML = "<strong>Paciente: </strong>" + cita.event.title;
        modalBody.innerHTML = "<strong>Descripción: </strong>" + cita.event.extendedProps["descripcion"] + "<br>" +
                              "<strong>DNI: </strong>" + cita.event.extendedProps["dni_paciente"] + "<br>" +
                              "<strong>Fecha: </strong>" + cita.event.extendedProps["fecha"] + "<br>" +
                              "<strong>Hora: </strong>" + cita.event.extendedProps["hora"] + "<br>" +
                              "<strong>Precio: </strong>" + cita.event.extendedProps["precio"] + "<br>" +
                              "<strong>Estado: </strong>" + cita.event.extendedProps["estado"] + "<br>"
                              ;
      }

      this.modal.nativeElement.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
    else if (this.modal && tipo === "pacientes"){
            const modalTitle = document.getElementById('modal-title');
            const modalBody = document.getElementById('modal-body');
            if (modalTitle && modalBody) {
              modalTitle.innerHTML = "<strong>Profesional: </strong>" + cita.event.title;
              modalBody.innerHTML = "<strong>Descripción: </strong>" + cita.event.extendedProps["descripcion"] + "<br>" +
                                    "<strong>Fecha: </strong>" + cita.event.extendedProps["fecha"] + "<br>" +
                                    "<strong>Hora: </strong>" + cita.event.extendedProps["hora"] + "<br>" +
                                    "<strong>Precio: </strong>" + cita.event.extendedProps["precio"] + "<br>" +
                                    "<strong>Estado: </strong>" + cita.event.extendedProps["estado"] + "<br>"
                                    ;
            }
      
            this.modal.nativeElement.style.display = 'block';
            document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.nativeElement.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
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

  filterCitesProfesional() {
    // console.log(this.filterCitesText);
    // console.log(this.filteredCitesProfesional);

    this.filteredCitesProfesional = this.citasUsuarioProfesional.filter((cita) => {
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

  filterCitesPaciente() {
    console.log(this.filterCitesText);
    console.log(this.filteredCitesPaciente);
    console.log(this.citasUsuarioProfesional);

    this.filteredCitesPaciente = this.citasUsuarioProfesional.filter((cita) => {
      const filter = this.filterCitesText.toLowerCase();
      const nombre_profesional = cita.nombre_profesional.toLowerCase();
      const fecha = cita.fecha.toLowerCase();

      return (
        nombre_profesional.includes(filter) ||
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
