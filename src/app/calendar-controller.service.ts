import { Injectable } from '@angular/core';
import { CalendarOptions, EventInput, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CalendarControllerService {
  usuario: any;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events: [] as EventSourceInput,
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false
    }

  };

  constructor() { 
  }

  // getCitasUsuario(citas:any) {
  //   for (let i = 0; i < citas.length; i++) {
  //     console.log(citas[i]);

  //     (this.calendarOptions.events as EventInput[]).push({
  //       "title": citas[i].title,
  //       "start": citas[i].fecha
  //     });
      
  // }
  // }
  getCitasUsuario(citas: any, rol: string) {
    if (rol === 'paciente') {
      this.calendarOptions.events = citas.map((cita: any) => {
        console.log(cita.fecha + 'T' + cita.hora);

        // const fechaHoraInicio = new Date(`${cita.fecha}T${cita.hora}`);
        return {
          title: cita.nombre_profesional,
          start: cita.fecha,
          // end: fechaHoraInicio,
          display: 'background',
          color: '#ff9f89',
          // timeZone: 'UTC',
          eventLimit: true, // allow "more" link when too many events
          eventLimitText: "More Events",
        };
      }) as EventInput[];
    } else if (rol === 'profesional') {
      this.calendarOptions.events = citas.map((cita: any) => {
        return {
          title: cita.nombre_paciente,
          start: cita.fecha,
          // end: fechaHoraInicio,
          display: 'background',
          color: '#ff9f89',
          // timeZone: 'UTC',
          eventLimit: true, // allow "more" link when too many events
          eventLimitText: "More Events",
        };
      }) as EventInput[];
    }
  }
  
  

  getCalendarOptions(): CalendarOptions {
    return this.calendarOptions;
  }
}
