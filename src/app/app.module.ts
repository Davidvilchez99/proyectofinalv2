import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PieComponent } from './pie/pie.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { LoginComponent } from './login/login.component';
import { ComentariosComponent } from './comentarios/comentarios.component';

/*----------------- */
// todos los imports de la aplicacion
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { UsuarioPrivadoComponent } from './usuario-privado/usuario-privado.component';
import { CrearPacienteComponent } from './crear-paciente/crear-paciente.component';
import { CrearCitaComponent } from './crear-cita/crear-cita.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { CrearComentarioComponent } from './crear-comentario/crear-comentario.component';
import { CitasUsuariosComponent } from './citas-usuarios/citas-usuarios.component';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { VerProgresoComponent } from './ver-progreso/ver-progreso.component';

@NgModule({
  declarations: [
    AppComponent,
    PieComponent,
    CabeceraComponent,
    CuerpoComponent,
    LoginComponent,
    ComentariosComponent,
    UsuarioPrivadoComponent,
    CrearPacienteComponent,
    CrearCitaComponent,
    EditarUsuarioComponent,
    CrearComentarioComponent,
    CitasUsuariosComponent,
    VerProgresoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    HttpClientModule,
    FormsModule,
    CommonModule,
    FullCalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
