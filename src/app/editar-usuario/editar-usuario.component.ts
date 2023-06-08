import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { DatosService } from '../datos.service';
import { AuthService } from '../auth.service';
import { last, switchMap } from 'rxjs/operators';
// import { AngularFireStorage } from '@angular/fire/storage';

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
  
  
  editarUsuario() {

    // // Subir imagen dientes final
    // if (this.imagenDientesInicial) {
    //   const filePathDientesInicial = `carpeta/imagen-dientes-inicial-${new Date().getTime()}`;
    //   const fileRefDientesInicial = this.storage.ref(filePathDientesInicial);
    //   const taskDientesInicial = this.storage.upload(filePathDientesInicial, this.imagenDientesInicial);
  
    //   taskDientesInicial.snapshotChanges().pipe(
    //     last(),
    //     switchMap(() => fileRefDientesInicial.getDownloadURL())
    //   ).subscribe((url: any) => {
    //     this.datosUsuario.imagenDientesInicial = url;
    //     console.log('URL de descarga de imagen dientes inicial:', url);
    //   });
    // }
  
    // // Subir imagen dientes final
    // if (this.imagenDientesFinal) {
    //   const filePathDientesFinal = `carpeta/imagen-dientes-final-${new Date().getTime()}`;
    //   const fileRefDientesFinal = this.storage.ref(filePathDientesFinal);
    //   const taskDientesFinal = this.storage.upload(filePathDientesFinal, this.imagenDientesFinal);
  
    //   taskDientesFinal.snapshotChanges().pipe(
    //     last(),
    //     switchMap(() => fileRefDientesFinal.getDownloadURL())
    //   ).subscribe((url: any) => {
    //     this.datosUsuario.imagenDientesFinal = url;
    //     console.log('URL de descarga de imagen dientes final:', url);
    //   });
    // }
    console.log(this.datosUsuario);
    this.datosService.editarUsuario(this.datosUsuario);
    // this.auth.editarUsuario(this.datosUsuario.email, this.datosUsuario.contrasena);
  }

  borrarUsuario() {
    this.datosService.borrarUsuario(this.datosUsuario.dni);
  }
}
