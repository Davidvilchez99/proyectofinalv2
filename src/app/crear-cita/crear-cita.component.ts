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
  dni_paciente = "";
  dni_profesional = "";
      
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
      // console.log(this.fecha);
      // console.log(this.estado);
      // console.log(this.precio);
      // console.log(this.descripcion);
      // console.log(this.paciente);
      // console.log(this.profesional);

      this.datosService.crearCita(this.fecha, this.estado, this.precio, this.descripcion, this.dni_paciente, this.dni_profesional);
      this.router.navigate(['/usuario-privado']);

      // this.rol = "paciente";
      // this.Usuario.crearUsuario(this.email, this.contrasena);
      // this.Datos.crearPaciente(this.rol, this.nombre, this.apellidos, this.telefono, this.email, this.direccion, this.dni, this.presupuesto, this.contrasena, this.getFechactual());
      // this.router.navigate(['/usuario-privado']);
    }
}
