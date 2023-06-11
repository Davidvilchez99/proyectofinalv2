import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CabeceraComponent } from './cabecera/cabecera.component';
import { PieComponent } from './pie/pie.component';
import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { LoginComponent } from './login/login.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { UsuarioPrivadoComponent } from '../app/usuario-privado/usuario-privado.component';
import { CrearCitaComponent } from './crear-cita/crear-cita.component';
import { CrearPacienteComponent } from './crear-paciente/crear-paciente.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';

import { CrearComentarioComponent } from './crear-comentario/crear-comentario.component';
import { CitasUsuariosComponent } from './citas-usuarios/citas-usuarios.component';
import { VerProgresoComponent } from './ver-progreso/ver-progreso.component';

// rutas de la aplicacion
const routes: Routes = [
  {
    path: 'cabecera',
    component: CabeceraComponent
  },
  {
    path: '',
    component: CuerpoComponent,
  },
  {
    path: 'pie',
    component: PieComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'comentarios',
    component: ComentariosComponent,
  },
  {
    path: 'usuario-privado',
    component: UsuarioPrivadoComponent,
  },
  {
    path: 'crear-cita',
    component: CrearCitaComponent,
  },
  {
    path: 'crear-paciente',
    component: CrearPacienteComponent,
  },
  {
    path: 'editar-usuario/:dni',
    component: EditarUsuarioComponent
  },
  {
    path: 'crear-comentario',
    component: CrearComentarioComponent,
  },
  {
    path: 'cita-usuario/:id/:rol',
    component: CitasUsuariosComponent,
  },
  {
    path: 'ver-progreso/:dni',
    component: VerProgresoComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
