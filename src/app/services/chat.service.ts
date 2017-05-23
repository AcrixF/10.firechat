import { Injectable } from '@angular/core';
import {AngularFire, AuthMethods, AuthProviders, FirebaseListObservable} from 'angularfire2';
import {Mensaje} from "../interfaces/mensaje.interface";

@Injectable()
export class ChatService {

  usuario: any = { } ;

  chats: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) {
   // this.chats = af.database.list('/chats');

    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.usuario = null;
    }
  }

  cargarMensajer(){
    this.chats = this.af.database.list('chats',{
      query:{
        limitToLast:20,
        orderByKey: true
      }
    });

    return this.chats;
  }

  agregarMensaje(texto: string){
    let mensaje: Mensaje = {
      nombre:this.usuario.auth.displayName,
      mensaje:texto,
      uid:this.usuario.uid
    }
    return this.chats.push( mensaje );
  }


  login(proveedor: string) {

    let provider;
    if (proveedor == 'Google'){
      provider = AuthProviders.Google;
    }else{
      provider = AuthProviders.Twitter;
    }

    this.af.auth.login({
      provider: provider,
      method: AuthMethods.Popup,
    }).then( data => {
      console.log(data);
      this.usuario = data;
      localStorage.setItem('usuario',JSON.stringify(data))
    });
  }

  logout() {

    localStorage.removeItem('usuario');
    this.usuario = null;

    this.af.auth.logout();
  }


}
