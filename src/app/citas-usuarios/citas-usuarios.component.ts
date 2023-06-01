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
  };
  id: any = null;
  usuarios: any[] = [];

  pacientes: any[] = [];
  profesionales : any[] = [];

  constructor(public route: ActivatedRoute, public datosService: DatosService, public auth: AuthService ) { 
    datosService.getUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
      // console.log(this.usuarios);
      this.obtenerProfesionalesyPacientes();
  });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.datosService.getCitaUsuario(this.id).then((citaUsuario: any) => {
        for (let index = 0; index < citaUsuario.length; index++) {
          if (citaUsuario[index].id == this.id) {

            this.citaUsuario = citaUsuario[index].data;
          }
        }
      });
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

  editarCitaUsuario(){
    this.datosService.getDatosUsuario(this.citaUsuario.dni_paciente).subscribe((usuarios) => {
      this.citaUsuario.nombre_paciente = usuarios[0].nombre+" "+usuarios[0].apellidos;
    });
    this.datosService.getDatosUsuario(this.citaUsuario.dni_profesional).subscribe((usuarios) => {
      this.citaUsuario.nombre_profesional = usuarios[0].nombre+" "+usuarios[0].apellidos;

      this.datosService.editarCitaUsuario(this.citaUsuario, this.id);
    });


  }
}
