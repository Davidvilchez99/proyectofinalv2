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
    // guarda todos los usuarios en un array
    datos.getUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
      this.obtenerProfesionalesyPacientes();
    });
  }
  // funcion para obtener los profesionales
  obtenerProfesionalesyPacientes(){
    for (let index = 0; index < this.usuarios.length; index++) {
      if (this.usuarios[index].rol == "profesional") {
        this.profesionales.push(this.usuarios[index]);
      }
    }
  }

  // funcion para crear un comentario
  crearComentario(){
    //comprobar que los todos campos no esten vacios
    if (this.comentario.nombre == "" || this.comentario.comentario == "") {
      alert("Debe completar todos los campos");
      return;
    }
    else{
      // crear comentario y redireccionar a la pagina de comentarios
    this.comentario.valoracion.toString();
    this.datos.crearComentario(this.comentario, this.getFechactual());
      this.router.navigate(['/comentarios']);
    }
  }

  // comprueba si el usuario es un paciente o un profesional
  ngOnInit() {
    if (this.Usuario.rol == "paciente") {
      this.comentario.nombre = this.Usuario.nombre + " " + this.Usuario.apellido;
    }
    else if (this.Usuario.rol == "profesional") {
      this.comentario.nombre = "Profesional - "+this.Usuario.nombre + " " + this.Usuario.apellido;
      this.comentario.profesional = this.Usuario.nombre + " " + this.Usuario.apellido;
    }
  }

  // funcion para obtener la fecha actual
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
