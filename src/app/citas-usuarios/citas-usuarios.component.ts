import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatosService } from '../datos.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-citas-usuarios',
  templateUrl: './citas-usuarios.component.html',
  styleUrls: ['./citas-usuarios.component.scss']
})
export class CitasUsuariosComponent {

  dni_profesional: any;
  dni_paciente: any;
  fecha : any = "";
  citaUsuario: any = {
    nombre_paciente: '',
    nombre_profesional: '',
    fecha: '',
    estado: '',
    precio: 0,
    descripcion: '',
    hora: ''
  };
  id: any = null;
  usuarios: any[] = [];
  rol : any = null;

  pacientes: any[] = [];
  profesionales : any[] = [];

  constructor(public route: ActivatedRoute, public datosService: DatosService, public auth: AuthService ) { 
    // guarda todos los usuarios en un array
    datosService.getUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
      this.obtenerProfesionalesyPacientes();
  });
  }
  
  // funcion para obtener la cita del usuario, coge el id por la url y busca la cita con ese id
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.rol = params.get('rol');
      this.datosService.getCitaUsuario(this.id).then((citaUsuario: any) => {
        for (let index = 0; index < citaUsuario.length; index++) {
          if (citaUsuario[index].id == this.id) {

            this.citaUsuario = citaUsuario[index].data;
          }
        }
      });
    });
  }
  
  // funcion para obtener los pacientes y los profesionales
  obtenerProfesionalesyPacientes(){
    for (let index = 0; index < this.usuarios.length; index++) {
      if (this.usuarios[index].rol == "paciente") {
          this.pacientes.push(this.usuarios[index]);
      }else if (this.usuarios[index].rol == "profesional") {
        this.profesionales.push(this.usuarios[index]);
      }
    }
  }
  // funcion para editar la cita del usuario
  // comprueba que los campos esten rellenos y pone el nombre junto es decir nombre y apellidos
  editarCitaUsuario(){
    this.datosService.getDatosUsuario(this.citaUsuario.dni_paciente).subscribe((usuarios) => {
      this.citaUsuario.nombre_paciente = usuarios[0].nombre+" "+usuarios[0].apellidos;
    });
    this.datosService.getDatosUsuario(this.citaUsuario.dni_profesional).subscribe((usuarios) => {
      this.citaUsuario.nombre_profesional = usuarios[0].nombre+" "+usuarios[0].apellidos;
    });

    // comprobar que los campos esten rellenos
    if (this.citaUsuario.dni_paciente == "" || this.citaUsuario.dni_profesional == "" || this.citaUsuario.fecha == "" || this.citaUsuario.estado == "" || this.citaUsuario.precio == 0 || this.citaUsuario.descripcion == "" || this.citaUsuario.hora == "") {
      alert("Rellene todos los campos");
      return;
    }
    else{
      // editar la cita del usuario
    this.datosService.editarCitaUsuario(this.citaUsuario, this.id);
    }

  }
}
