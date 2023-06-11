import { Injectable } from '@angular/core';
import { doc, Firestore, collectionData, collection, query, where, addDoc, setDoc, deleteDoc, getDocs, DocumentSnapshot, DocumentData, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getFirestore, DocumentReference } from 'firebase/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

// servicio para trabajar con la base de datos
// firebase

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  // trae base de datos
  db = getFirestore();

  constructor(public firestore: Firestore, public router: Router) {

  }
  // obtener usuario por email
  getUserWithEmail(email: string): Observable<any[]> {
    const datos = collection(this.firestore, 'usuarios');
    const q = query(datos, where("email", "==", email));
    return collectionData(q, { idField: 'id' });
  }
  // obtener comentarios
  getComentarios(): Observable<any[]> {
    const datos = collection(this.firestore, 'comentarios');
    return collectionData(datos, { idField: 'id' });
  }
  // obtener usuarios
  getUsuarios(): Observable<any[]> {
    const datos = collection(this.firestore, 'usuarios');
    return collectionData(datos, { idField: 'id' });
  }
  // obtener citas de un paciente
  getCitasdePacientes(dni: string): Observable<any[]> {
    const citasRef = collection(this.firestore, "citas");
    const q = query(citasRef, where("dni_paciente", "==", dni));
    return collectionData(q, { idField: "id" });
  }
  // obtener citas de un profesional
  getCitasdeProfesionales(dni: string): Observable<any[]> {
    const citasRef = collection(this.firestore, "citas");
    const q = query(citasRef, where("dni_profesional", "==", dni));
    return collectionData(q, { idField: "id" });
  }
  // obtener datos de un usuario
  getDatosUsuario(dni: string): Observable<any[]> {
    const datos = collection(this.firestore, 'usuarios');
    const q = query(datos, where("dni", "==", dni));
    return collectionData(q, { idField: 'id' });
  }

  // obtener citas de un usuario
  async getCitaUsuario(id: string) {
    const querySnapshot = await getDocs(collection(this.db, "citas"));
    const citaUsuario = [] as any;

    querySnapshot.forEach((doc) => {
      citaUsuario.push({ id: doc.id, data: doc.data() });
    });

    return citaUsuario;
  }


  // crear un paciente
  crearPaciente(rol: string, nombre: string, apellidos: string, telefono: string, email: string, direccion: string, 
    dni: string, presupuesto: number, contrasena: string, fecha: string) {

    setDoc(doc(this.db, "usuarios", dni), {
      rol: rol,
      nombre: nombre,
      apellidos: apellidos,
      direccion: direccion,
      telefono: telefono,
      email: email,
      dni: dni,
      presupuesto: presupuesto,
      contraseña: contrasena,
      fecha: fecha,
      imagenInicial : "Imagen no disponible",
      imagenFinal : "Imagen no disponible",
    });
  }

  // crear un profesional
  crearProfesional(rol: string, nombre: string, apellidos: string, telefono: string, email: string, direccion: string, dni: string, cuentaBancaria: string, salario: number, horario: string, cargo: string, contrasena: string, fecha: string) {
    setDoc(doc(this.db, "usuarios", dni), {
      rol: rol,
      nombre: nombre,
      apellidos: apellidos,
      direccion: direccion,
      telefono: telefono,
      email: email,
      dni: dni,
      cuentaBancaria: cuentaBancaria,
      salario: salario,
      horario: horario,
      cargo: cargo,
      contraseña: contrasena,
      fecha: fecha
    });
  }

  // crear un administrador
  crearAdministador(rol: string, nombre: string, apellidos: string, email: string, dni: string, contrasena: string, fecha: string) {
    dni = "admin-" + dni;
    setDoc(doc(this.db, "usuarios", dni), {
      rol: "administrativo",
      nombre: nombre,
      apellidos: apellidos,
      email: email,
      dni: dni,
      contraseña: contrasena,
      fecha: fecha
    });
  }
  
  // crear una cita
  crearCita(fecha: string, estado: string, precio: number, descripcion: string, paciente: string, profesional: string, hora: string) {
    let nombrePaciente = "";
    let dniPaciente = "";
    let nombreProfesional = "";
    let dniProfesional = "";

    dniPaciente = paciente.split("-")[0];
    nombrePaciente = paciente.split("-")[1];
    dniProfesional = profesional.split("-")[0];
    nombreProfesional = profesional.split("-")[1];

    addDoc(collection(this.db, "citas"), {
      fecha: fecha,
      estado: estado,
      precio: precio,
      descripcion: descripcion,
      dni_paciente: dniPaciente,
      nombre_paciente: nombrePaciente,
      dni_profesional: dniProfesional,
      nombre_profesional: nombreProfesional,
      hora: hora
    });
  }

  // editar un usuario
  editarUsuario(datosUsuario: any) {
    if (datosUsuario.rol == "paciente") {
      setDoc(doc(this.db, "usuarios", datosUsuario.dni), {
        nombre: datosUsuario.nombre,
        apellidos: datosUsuario.apellidos,
        direccion: datosUsuario.direccion,
        telefono: datosUsuario.telefono,
        email: datosUsuario.email,
        dni: datosUsuario.dni,
        presupuesto: datosUsuario.presupuesto,
        contraseña: datosUsuario.contraseña,
        fecha: datosUsuario.fecha,
        imagenInicial : datosUsuario.imagenInicial,
        imagenFinal : datosUsuario.imagenFinal,
        rol : datosUsuario.rol
      });
    }
    else {
      setDoc(doc(this.db, "usuarios", datosUsuario.dni), {
        nombre: datosUsuario.nombre,
        apellidos: datosUsuario.apellidos,
        direccion: datosUsuario.direccion,
        telefono: datosUsuario.telefono,
        email: datosUsuario.email,
        dni: datosUsuario.dni,
        cuentaBancaria: datosUsuario.cuentaBancaria,
        salario: datosUsuario.salario,
        horario: datosUsuario.horario,
        cargo: datosUsuario.cargo,
        contraseña: datosUsuario.contraseña,
        fecha: datosUsuario.fecha
      });
    }
    this.router.navigate(['usuario-privado']);
  }

  // crear un comentario
  crearComentario(comentario: any, fecha: string) {
    addDoc(collection(this.db, "comentarios"), {
      nombre: comentario.nombre,
      comentario: comentario.comentario,
      fecha: fecha,
      profesional: comentario.profesional,
      valoracion: comentario.valoracion
    });
  }

  // borrar un usuario y sus citas
  async borrarUsuario(dni: string) {
    // Eliminar usuario de la base de datos de Firebase por su dni
    await deleteDoc(doc(this.db, "usuarios", dni));
  
    // Borrar citas del usuario de la base de datos de Firebase por su dni cuando dni_paciente = dni o dni_profesional = dni
    const citasRef = collection(this.firestore, "citas");
    const q = query(citasRef, where("dni_paciente", "==", dni));
    const q2 = query(citasRef, where("dni_profesional", "==", dni));
  
    const querySnapshot = await getDocs(q);
    const querySnapshot2 = await getDocs(q2);
  
    querySnapshot.forEach((docSnapshot) => {
      deleteDoc(doc(this.db, "citas", docSnapshot.id));
    });
  
    querySnapshot2.forEach((docSnapshot) => {
      deleteDoc(doc(this.db, "citas", docSnapshot.id));
    });
  
    this.router.navigate(['usuario-privado']);
  }
  
  // borrar una cita
  async borrarCita(citaId: string) {
    deleteDoc(doc(this.db, "citas", citaId));

  }
  
  // eliminar un administrativo
  eliminarAdministrativo(dni: string) {
    deleteDoc(doc(this.db, "usuarios", dni));
  }

  // editar una cita
  editarCitaUsuario(cita: any, citaId: string) {
    setDoc(doc(this.db, "citas", citaId), {
      fecha: cita.fecha,
      estado: cita.estado,
      precio: cita.precio,
      descripcion: cita.descripcion,
      dni_paciente: cita.dni_paciente,
      nombre_paciente: cita.nombre_paciente,
      dni_profesional: cita.dni_profesional,
      nombre_profesional: cita.nombre_profesional,
      hora: cita.hora
    });
    this.router.navigate(['usuario-privado']);
  }

}
