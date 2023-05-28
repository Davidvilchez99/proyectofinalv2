import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { DatosService } from '../datos.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

  datosUsuario: any;
  dni: any;

  constructor(public route: ActivatedRoute, public datosService: DatosService, public auth: AuthService ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.dni = params.get('dni');
      this.datosService.getDatosUsuario(this.dni).subscribe((datos) => {
        this.datosUsuario = datos[0];
        console.log(this.datosUsuario);
        });
    });
  }

  editarUsuario() {
    // console.log(this.datosUsuario);
    this.datosService.editarUsuario(this.datosUsuario);
    // this.auth.editarUsuario(this.datosUsuario.email, this.datosUsuario.contrasena);
  }
}
