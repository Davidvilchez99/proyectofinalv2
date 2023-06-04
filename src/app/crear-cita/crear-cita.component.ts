import { Component } from '@angular/core';
import { DatosService } from '../datos.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.scss']
})
export class CrearCitaComponent {

  usuarios: any[] = [];

  pacientes: any[] = [];
  profesionales : any[] = [];

  fecha = "";
  estado = "";
  precio = 0;
  descripcion = "";
  paciente = "";
  profesional = "";
  horaInicio = "";
      
    constructor(public datosService: DatosService, public Usuario : AuthService, public router: Router) { 
      datosService.getUsuarios().subscribe((usuarios) => {
        this.usuarios = usuarios;
        // console.log(this.usuarios);
        this.obtenerProfesionalesyPacientes();
    });

      
    }

    obtenerProfesionalesyPacientes(){
      for (let index = 0; index < this.usuarios.length; index++) {
        if (this.usuarios[index].rol == "paciente") {
          this.pacientes.push(this.usuarios[index]);
        }else if (this.usuarios[index].rol == "profesional") {
          this.profesionales.push(this.usuarios[index]);
        }
      }
    }

    


    

    crearCita() {
      this.datosService.crearCita(this.fecha, this.estado, this.precio, this.descripcion, this.paciente, this.profesional, this.horaInicio);
      this.router.navigate(['/usuario-privado']);
    }
}
