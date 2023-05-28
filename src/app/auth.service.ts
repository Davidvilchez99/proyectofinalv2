import { Injectable } from '@angular/core';
import { getAuth, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updatePassword } from '@angular/fire/auth';
import { Firestore, collectionData, collection, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { DatosService } from './datos.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId: string = "";
  emailUser: string = "";
  dni: string = "";
  estaLogueado: boolean = false;
  logueado: boolean = false;
  rol : string = "";
  citas : any[] = [];
  private auth: Auth;
  private originalAuth: Auth;

  
  constructor(public firestore: Firestore, public datos : DatosService) {
    this.auth = getAuth();
    this.originalAuth = this.auth; // Almacena la instancia original de autenticación
    this.comprobarSiEstaLogueado(this.auth);
  }

  
  
  editarUsuario(email: string, contraseña: string){
      // cambiar la contraseña a un usuario ya creado mediante el email
      signInWithEmailAndPassword(this.auth, email, contraseña)
      .then((userCredential) => {
        // Actualiza la contraseña
        updatePassword(userCredential.user, contraseña).then(() => {
          // Actualización de contraseña exitosa
          console.log("contraseña actualizada");
          // Restablece la instancia original de autenticación
          this.auth = this.originalAuth;
          // ...
        }).catch((error) => {
          // Error al actualizar la contraseña
          // ...
        });
      }
      );
  }


  login(usuario: string, contraseña: string) {
    signInWithEmailAndPassword(this.auth, usuario, contraseña)
      .then((userCredential) => {
        // Inicio de sesión exitoso
        const user = userCredential.user;
        this.userId = user.uid;
        this.emailUser = user.email || "";
        this.estaLogueado = true;
        this.logueado = true;
        // consultar rol de usuario en base de datos usuarios
        this.consultarRolUsuario();
        // this.obtenerCitasPaciente();
        // this.obtenerCitasProfesional();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  }

    crearUsuario(usuario: string, contraseña: string) {
      createUserWithEmailAndPassword(this.auth, usuario, contraseña)
        .then((userCredential) => {
          // El usuario se creó correctamente
          console.log("usuario creado");
          // Restablece la instancia original de autenticación
          this.auth = this.originalAuth;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ...
        });
    }
  

    comprobarSiEstaLogueado(auth: any) {
      onAuthStateChanged(auth, (user: any) => {
        if (user) {
          const userId = user.uid;
          const emailUser = user.email;
    
          if (!this.estaLogueado) {
            // Actualiza los datos del usuario solo si no se ha iniciado sesión anteriormente
            this.userId = userId;
            this.emailUser = emailUser;
            this.estaLogueado = true;
            // consultar rol de usuario en base de datos usuarios
            this.consultarRolUsuario();
            // this.obtenerCitasPaciente();
            // this.obtenerCitasProfesional();          
}
        } else {
          this.userId = "";
          this.emailUser = "";
          this.estaLogueado = false;
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
        if (this.rol == "paciente") {
          this.obtenerCitasPaciente();
        }else if (this.rol == "profesional") {
          this.obtenerCitasProfesional();
        }

      }
      );
    }

    // obtenerDniUsuario() {
    //   const datos = collection(this.firestore, 'usuarios');
    //   const q = query(datos, where("email", "==", this.emailUser));
    //   const datosUsuario = collectionData(q, { idField: 'email' });
    //   datosUsuario.subscribe((datos: any) => {
    //     this.dni = datos[0].dni;  
    //   }
    //   );      
    // }
    
    obtenerCitasPaciente (){
      const datos = collection(this.firestore, 'usuarios');
      const q = query(datos, where("email", "==", this.emailUser));
      const datosUsuario = collectionData(q, { idField: 'email' });
      datosUsuario.subscribe((datos: any) => {
        this.dni = datos[0].dni;  

        this.datos.getCitasdePacientes(this.dni).subscribe((citas) => {
          this.citas = citas;
          console.log(this.citas);
      });
        }
        
      );
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
      });
        }
        
      );
    }
    


    cerrarSesion() {
      signOut(this.auth).then(() => {
        // Sign-out successful.
        console.log("sesion cerrada");
        this.estaLogueado = false;
        console.log(this.estaLogueado);
      }).catch((error) => {
        // An error happened.
      });
    }

}
