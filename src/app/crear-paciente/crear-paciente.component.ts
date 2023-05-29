import { Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { AuthService } from '../auth.service';
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { DatosService } from '../datos.service';
import { get } from 'firebase/database';
import { Router } from '@angular/router';



@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.scss']
})
export class CrearPacienteComponent {

    tipo = "paciente";
    rol = "";
    nombre = "";
    apellidos = "";
    dni = "";
    telefono = "";
    email = "";
    direccion = "";
    presupuesto = 0;
    cuentaBancaria = "";
    cargo = "";
    salario = 0;
    horario = "";
    contrasena = "";

    

  
    constructor(public firebase: FirebaseApp, public Usuario: AuthService, public Datos: DatosService, public router: Router) { }

    crearPaciente() {
      this.rol = "paciente";
      this.Datos.crearPaciente(this.rol, this.nombre, this.apellidos, this.telefono, this.email, this.direccion, this.dni, this.presupuesto, this.contrasena, this.getFechactual());
      this.router.navigate(['/usuario-privado']);
    }

    crearProfesional(){
      this.rol = "profesional";
      this.Datos.crearProfeisonal(this.rol, this.nombre, this.apellidos, this.telefono, this.email, this.direccion, this.dni, this.cuentaBancaria, this.salario, this.horario, this.cargo, this.contrasena, this.getFechactual());
      this.router.navigate(['/usuario-privado']);
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
