import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { WebSocketServiceService } from './core/services/web-socket-service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'uav-frontend';
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }



        //------ ESTO SE COMENTA PARA PROBAR CONEXION CON SIMULADOR REAL 
  // constructor(private webSocketService: WebSocketServiceService) { }

  // ngOnInit() {
  //   this.webSocketService.connect();
  // }

       //--------------------------
       
}
