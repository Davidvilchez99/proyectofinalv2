import { Injectable } from '@angular/core';
import { doc, Firestore, collectionData, collection, query, where, addDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getFirestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  db = getFirestore();

  constructor(public firestore : Firestore) { 

  }
  getComentarios(): Observable<any[]> {
    const datos = collection(this.firestore, 'comentarios');
    return collectionData(datos, { idField: 'id' });
  }

  getUsuarios(): Observable<any[]> {
    const datos = collection(this.firestore, 'usuarios');
    return collectionData(datos, { idField: 'id' });
  }

  getCitasdePacientes(dni:string): Observable<any[]> {
    const citasRef = collection(this.firestore, "citas");
    const q = query(citasRef, where("dni_paciente", "==", dni));
    return collectionData(q, { idField: "id" });
  }

  getCitasdeProfesionales(dni:string): Observable<any[]> {
    const citasRef = collection(this.firestore, "citas");
    const q = query(citasRef, where("dni_profesional", "==", dni));
    return collectionData(q, { idField: "id" });
  }

  getDatosUsuario(dni:string): Observable<any[]> {
    const datos = collection(this.firestore, 'usuarios');
    const q = query(datos, where("dni", "==", dni));
    return collectionData(q, { idField: 'id' });
  }

  crearPaciente(rol:string, nombre:string, apellidos:string, telefono:string, email:string, direccion:string, dni:string, presupuesto:number, contrasena:string, fecha:string){
    
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
        fecha: fecha
    });
  }

  crearProfeisonal(rol:string, nombre:string, apellidos:string, telefono:string, email:string, direccion:string, dni:string, cuentaBancaria:string, salario:number, horario:string, cargo:string, contrasena:string, fecha:string){
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

  crearCita(fecha:string, estado:string, precio:number, descripcion:string, dni_paciente:string, dni_profesional:string){
    addDoc(collection(this.db, "citas"), {
      fecha: fecha,
      estado: estado,
      precio: precio,
      descripcion: descripcion,
      dni_paciente: dni_paciente,
      dni_profesional: dni_profesional
    });
  }

  editarUsuario(datosUsuario: any){
    setDoc(doc(this.db, "usuarios", datosUsuario.dni), {
      rol: datosUsuario.rol,
      nombre: datosUsuario.nombre,
      apellidos: datosUsuario.apellidos,
      direccion: datosUsuario.direccion,
      telefono: datosUsuario.telefono,
      email: datosUsuario.email,
      dni: datosUsuario.dni,
      presupuesto: datosUsuario.presupuesto,
      contraseña: datosUsuario.contraseña,
      fecha: datosUsuario.fecha
    });
  }
}
