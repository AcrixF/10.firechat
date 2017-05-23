import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {

  mensaje: string = '';
  elemento: any;

  constructor(public _cs: ChatService) {

    _cs.cargarMensajer().subscribe(() => {
      console.log("Mensajes cargados");
      setTimeout(() => this.elemento.scrollTop = this.elemento.scrollHeight ,10 );
    });

  }

  ngOnInit() {

    this.elemento = document.getElementById("app-mensajes");
    console.log(this.elemento)
  }

  enviar(){

    if (this.mensaje.length == 0)
      return;

    this._cs.agregarMensaje( this.mensaje )
      .then( ()=> console.log("Hecho"))
      .catch((error) => console.log(error));

    this.mensaje = '';
  }

}
