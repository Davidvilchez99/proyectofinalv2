import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { DatosService } from '../datos.service';
import { Router } from '@angular/router';
import {Form} from '@angular/forms';

@Component({
  selector: 'app-crear-comentario',
  templateUrl: './crear-comentario.component.html',
  styleUrls: ['./crear-comentario.component.scss']
})
export class CrearComentarioComponent {

  comentario = {
    nombre: '',
    comentario: '',
    profesional: '',
    valoracion: 0

  }

  usuarios: any[] = [];
  profesionales : any[] = [];

  constructor(public Usuario : AuthService, public datos : DatosService, public router: Router) { 
    datos.getUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
      // console.log(this.usuarios);
      this.obtenerProfesionalesyPacientes();
    });
  }

  obtenerProfesionalesyPacientes(){
    for (let index = 0; index < this.usuarios.length; index++) {
      if (this.usuarios[index].rol == "profesional") {
        this.profesionales.push(this.usuarios[index]);
      }
    }
  }

  crearComentario(){
    this.comentario.valoracion.toString();
    this.datos.crearComentario(this.comentario, this.getFechactual());
      this.router.navigate(['/comentarios']);
  }
  ngOnInit() {
    if (this.Usuario.rol == "paciente") {
      this.comentario.nombre = this.Usuario.nombre + " " + this.Usuario.apellido;
    }
    else if (this.Usuario.rol == "profesional") {
      this.comentario.nombre = "Profesional - "+this.Usuario.nombre + " " + this.Usuario.apellido;
      this.comentario.profesional = this.Usuario.nombre + " " + this.Usuario.apellido;
    }
  }


  getFechactual(){
    var fechaActual = new Date();
    var horaActual = fechaActual.getHours() + ':' + fechaActual.getMinutes() + ':' + fechaActual.getSeconds();
    var diaActual = fechaActual.getDate();
    var mesActual = fechaActual.getMonth() + 1;
    var añoActual = fechaActual.getFullYear();
    var fecha = diaActual + "/" + mesActual + "/" + añoActual + " " + horaActual;
    return fecha;
  }
}
