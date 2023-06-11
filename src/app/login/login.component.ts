import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent { 

  username = "";
  password = "";

  constructor(public Usuario: AuthService, public router: Router) {
  }
  // funcion para loguearse
  loginUsuario() {
    this.Usuario.login(this.username, this.password);
  }


}
