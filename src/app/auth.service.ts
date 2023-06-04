import { Injectable } from '@angular/core';
import { getAuth, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updatePassword } from '@angular/fire/auth';
import { Firestore, collectionData, collection, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { DatosService } from './datos.service';
import { Router } from '@angular/router';
import { CalendarControllerService } from './calendar-controller.service';



@Injectable({
  providedIn: 'root',
})

export class AuthService {
  userId: string = "";
  emailUser: string = "";
  dni: string = "";
  nombre: string = "";
  apellido: string = "";
  estaLogueado: boolean = false;
  logueado: boolean = false;
  rol : string = "";
  citas : any[] = [];
  // private auth: Auth;
  // private originalAuth: Auth;

  
  constructor(public firestore: Firestore, public datos: DatosService, public router: Router, public calendarService: CalendarControllerService) {
    this.restoreAuthState();
  }

  private restoreAuthState() {
    const authState = localStorage.getItem('authState');
    if (authState) {
      const {
        userId,
        emailUser,
        estaLogueado,
        logueado,
        rol,
        nombre,
        apellido,
        dni
      } = JSON.parse(authState);
      this.userId = userId;
      this.emailUser = emailUser;
      this.estaLogueado = estaLogueado;
      this.logueado = logueado;
      this.rol = rol;
      this.nombre = nombre;
      this.apellido = apellido;
      this.dni = dni;

      if (rol === 'paciente') {
        this.obtenerCitasPaciente();
      } else if (rol === 'profesional') {
        this.obtenerCitasProfesional();
      }
    }
  }

  private saveAuthState() {
    const authState = JSON.stringify({
      userId: this.userId,
      emailUser: this.emailUser,
      estaLogueado: this.estaLogueado,
      logueado: this.logueado,
      rol: this.rol,
      nombre: this.nombre,
      apellido: this.apellido,
      dni: this.dni
    });
    localStorage.setItem('authState', authState);
  }

  login(usuarioData: string, contraseñaData: string) {
    this.datos.getUsuarios().subscribe((usuarios) => {
      let usuarioEncontrado = false;
  
      for (let usuario of usuarios) {
        if (usuario.email == usuarioData && usuario.contraseña == contraseñaData) {
          this.estaLogueado = true;
          this.logueado = true;
          this.emailUser = usuario.email;
          this.rol = usuario.rol;
          this.nombre = usuario.nombre;
          this.apellido = usuario.apellidos;
          this.dni = usuario.dni;
  
  
          if (this.rol == 'paciente') {
            this.obtenerCitasPaciente();
          } else if (this.rol == 'profesional') {
            this.obtenerCitasProfesional();
          }
  
          this.saveAuthState(); // Guardar estado de autenticación
          usuarioEncontrado = true;
          break; // Salir del bucle una vez que se ha encontrado el usuario
        }
      }
  
      if (usuarioEncontrado) {
        console.log(this.rol, this.nombre, this.apellido , this.emailUser, this.estaLogueado, this.logueado, this.dni);
        this.router.navigate(['usuario-privado']);
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    });
  }


    consultarRolUsuario() {
      // consultar rol de usuario en base de datos usuarios
      const datos = collection(this.firestore, 'usuarios');
      const q = query(datos, where("email", "==", this.emailUser));
      const datosUsuario = collectionData(q, { idField: 'email' });
      datosUsuario.subscribe((datos: any) => {
        this.rol = datos[0].rol;
        this.nombre = datos[0].nombre;
        if (this.rol == "paciente") {
          this.obtenerCitasPaciente();
        }else if (this.rol == "profesional") {
          this.obtenerCitasProfesional();
        }

      }
      );
    }

    
    obtenerCitasPaciente (){
      const datos = collection(this.firestore, 'usuarios');
      const q = query(datos, where("email", "==", this.emailUser));
      const datosUsuario = collectionData(q, { idField: 'email' });
      datosUsuario.subscribe((datos: any) => {
        this.dni = datos[0].dni; 

        this.datos.getCitasdePacientes(this.dni).subscribe((citas) => {
          this.citas = citas;

          this.calendarService.getCitasUsuario(this.citas, this.rol);

      });
        }
        
      );
    }

    obtenerCitasUsuario(dni: string, rol: string): Observable<any[]> {
      if (rol == "paciente") {
        return this.datos.getCitasdePacientes(dni);
      }else if (rol == "profesional") {
        return this.datos.getCitasdeProfesionales(dni);
      }
      return new Observable<any[]>(observer => {
        observer.next([]); // Puedes ajustar el valor por defecto según tus necesidades
        observer.complete();
      });
    }

    obtenerCitasProfesional (){
      const datos = collection(this.firestore, 'usuarios');
      const q = query(datos, where("email", "==", this.emailUser));
      const datosUsuario = collectionData(q, { idField: 'email' });
      datosUsuario.subscribe((datos: any) => {
        this.dni = datos[0].dni;  

        this.datos.getCitasdeProfesionales(this.dni).subscribe((citas) => {
          this.citas = citas;
          console.log(this.citas);
          this.calendarService.getCitasUsuario(this.citas, this.rol);

      });
        }
        
      );
    }
    


    cerrarSesion() {
      this.estaLogueado = false;
      this.logueado = false;
      this.userId = '';
      this.emailUser = '';
      this.rol = '';
      this.nombre = '';
      this.dni = '';
      this.citas = [];
      localStorage.removeItem('authState'); // Eliminar estado de autenticación almacenado
      this.router.navigate(['']);
    }

}
