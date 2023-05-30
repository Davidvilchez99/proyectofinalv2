import { Injectable } from '@angular/core';
import { getAuth, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updatePassword } from '@angular/fire/auth';
import { Firestore, collectionData, collection, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { DatosService } from './datos.service';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})

export class AuthService {
  userId: string = "";
  emailUser: string = "";
  dni: string = "";
  nombre: string = "";
  estaLogueado: boolean = false;
  logueado: boolean = false;
  rol : string = "";
  citas : any[] = [];
  // private auth: Auth;
  // private originalAuth: Auth;

  
  constructor(public firestore: Firestore, public datos: DatosService, public router: Router) {
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
      } = JSON.parse(authState);
      this.userId = userId;
      this.emailUser = emailUser;
      this.estaLogueado = estaLogueado;
      this.logueado = logueado;
      this.rol = rol;
      this.nombre = nombre;

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
  
          console.log(this.rol, this.nombre, this.emailUser, this.estaLogueado, this.logueado);
  
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
        console.log(this.rol, this.nombre, this.emailUser, this.estaLogueado, this.logueado);
        this.router.navigate(['usuario-privado']);
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    });
  }
  
  
  // editarUsuario(email: string, contraseña: string){
  //     // cambiar la contraseña a un usuario ya creado mediante el email
  //     signInWithEmailAndPassword(this.auth, email, contraseña)
  //     .then((userCredential) => {
  //       // Actualiza la contraseña
  //       updatePassword(userCredential.user, contraseña).then(() => {
  //         // Actualización de contraseña exitosa
  //         console.log("contraseña actualizada");
  //         // Restablece la instancia original de autenticación
  //         this.auth = this.originalAuth;
  //         // ...
  //       }).catch((error) => {
  //         // Error al actualizar la contraseña
  //         // ...
  //       });
  //     }
  //     );
  // }


  // login(usuario: string, contraseña: string) {
  //   signInWithEmailAndPassword(this.auth, usuario, contraseña)
  //     .then((userCredential) => {
  //       // Inicio de sesión exitoso
  //       const user = userCredential.user;
  //       this.userId = user.uid;
  //       this.emailUser = user.email || "";
  //       this.estaLogueado = true;
  //       this.logueado = true;
  //       // consultar rol de usuario en base de datos usuarios
  //       this.consultarRolUsuario();
  //       // this.obtenerCitasPaciente();
  //       // this.obtenerCitasProfesional();
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // ...
  //     });
  // }

    // crearUsuario(usuario: string, contraseña: string) {
    //   createUserWithEmailAndPassword(this.auth, usuario, contraseña)
    //     .then((userCredential) => {
    //       // El usuario se creó correctamente
    //       console.log("usuario creado");
    //       // Restablece la instancia original de autenticación
    //       this.auth = this.originalAuth;
    //       // ...
    //     })
    //     .catch((error) => {
    //       const errorCode = error.code;
    //       const errorMessage = error.message;
    //       // ...
    //     });
    // }
  

//     comprobarSiEstaLogueado(auth: any) {
//       onAuthStateChanged(auth, (user: any) => {
//         if (user) {
//           const userId = user.uid;
//           const emailUser = user.email;
    
//           if (!this.estaLogueado) {
//             // Actualiza los datos del usuario solo si no se ha iniciado sesión anteriormente
//             this.userId = userId;
//             this.emailUser = emailUser;
//             this.estaLogueado = true;
//             // consultar rol de usuario en base de datos usuarios
//             this.consultarRolUsuario();
//             // this.obtenerCitasPaciente();
//             // this.obtenerCitasProfesional();          
// }
//         } else {
//           this.userId = "";
//           this.emailUser = "";
//           this.estaLogueado = false;
//         }
//       });
//     }

    comprobarSiEstaLogueado() {
      // if (this.estaLogueado) {
        
      // }
      console.log(this.estaLogueado, this.logueado, this.emailUser, this.rol, this.nombre);
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
      this.estaLogueado = false;
      this.logueado = false;
      this.userId = '';
      this.emailUser = '';
      this.rol = '';
      this.nombre = '';
      this.citas = [];
      localStorage.removeItem('authState'); // Eliminar estado de autenticación almacenado
      this.router.navigate(['']);
    }

}
