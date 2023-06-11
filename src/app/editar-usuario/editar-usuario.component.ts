import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { DatosService } from '../datos.service';
import { AuthService } from '../auth.service';
import { last, switchMap } from 'rxjs/operators';
import { event } from 'jquery';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

  datosUsuario: any;
  dni: any;
  imagenDientesInicial: any;
  imagenDientesFinal: any;

  constructor(public route: ActivatedRoute, public datosService: DatosService, public auth: AuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.dni = params.get('dni');
      this.datosService.getDatosUsuario(this.dni).subscribe((datos) => {
        this.datosUsuario = datos[0];
        console.log(this.datosUsuario);
        });
    });
  }
  
  cargarImagen(event: any, tipo: string) {
    console.log(event.target.files[0]);


    let archivos = event.target.files;
    let reader = new FileReader();

    reader.readAsDataURL(archivos[0]);
    reader.onloadend = () => {
      console.log(reader.result);
      if (tipo === 'inicial') {
      this.datosUsuario.imagenInicial = reader.result;
      } else {
        this.datosUsuario.imagenFinal = reader.result;
      }
  }
}

  editarUsuario() {
    // comprobar que los campos no estan vacios
    if (this.datosUsuario.nombre === '' || this.datosUsuario.apellidos === '' || this.datosUsuario.dni === '' || this.datosUsuario.telefono === '' || this.datosUsuario.email === '') {
      alert('Rellene todos los campos');
      return;
    }else{
      this.datosService.editarUsuario(this.datosUsuario);
    }
  }

  borrarUsuario() {
    this.datosService.borrarUsuario(this.datosUsuario.dni);
  }
}
