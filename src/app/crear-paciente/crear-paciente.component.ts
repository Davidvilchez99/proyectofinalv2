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

    crearUsuario(tipo: string) {
      if(tipo == "paciente"){

      this.rol = "paciente";
      console.log(this.rol);
      if (this.rol == "" || this.nombre == "" || this.apellidos == "" || this.telefono == "" || this.email == "" || this.direccion == "" || this.dni == "" || this.presupuesto == 0 || this.contrasena == "") {
        alert("Rellene todos los campos obligatorios");
      } else {
      this.Datos.crearPaciente(this.rol, this.nombre, this.apellidos, this.telefono, this.email, this.direccion, this.dni, this.presupuesto, this.contrasena, this.getFechactual());
      this.router.navigate(['/usuario-privado']);
      }
    }else if(tipo == "profesional"){
      this.rol = "profesional";
      console.log(this.rol);
      if (this.rol == "" || this.nombre == "" || this.apellidos == "" || this.telefono == "" || this.email == "" || this.direccion == "" || this.dni == "" || this.cuentaBancaria == "" || this.salario == 0 || this.horario == "" || this.cargo == "" || this.contrasena == "") {
        alert("Rellene todos los campos obligatorios");
      }
      else{
      this.Datos.crearProfesional(this.rol, this.nombre, this.apellidos, this.telefono, this.email, this.direccion, this.dni, this.cuentaBancaria, this.salario, this.horario, this.cargo, this.contrasena, this.getFechactual());
      this.router.navigate(['/usuario-privado']);
    }
    }else if(tipo == "administrador"){
      this.rol = "administrador";
      console.log(this.rol);
      if (this.rol == "" || this.nombre == "" || this.apellidos == "" || this.email == "" || this.dni == "" || this.contrasena == "") {
        alert("Rellene todos los campos obligatorios");
      }
      else{
      this.Datos.crearAdministador(this.rol, this.nombre, this.apellidos, this.email, this.dni, this.contrasena, this.getFechactual());
      this.router.navigate(['/usuario-privado']);
    }
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
