import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { DatosService } from '../datos.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-privado',
  templateUrl: './usuario-privado.component.html',
  styleUrls: ['./usuario-privado.component.scss']
})
export class UsuarioPrivadoComponent {
  citas: any[] = [];
  dni: any;
  datos: any[] = [];
  usuarios: any[] = []; 

  constructor(public Usuario: AuthService, public datosService: DatosService) {
    datosService.getUsuarios().subscribe((usuarios) => {        
      for (let i = 0; i<usuarios.length; i++) {
        if (usuarios[i].rol == "paciente" || usuarios[i].rol == "profesional") {
          this.usuarios.push(usuarios[i]);
        }
      }
    });
}

}