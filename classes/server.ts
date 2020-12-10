import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';

export default class Server {

   private static _instance: Server;

   public app: express.Application;
   public port: number;

   public io: socketIO.Server;
   private httpSever: http.Server;

   private constructor() {
      this.app = express();
      this.port = SERVER_PORT;

      this.httpSever = new http.Server(this.app);
      this.io = socketIO(this.httpSever);
      this.escucharSockets();
   }

   public static get instance() {
      return this._instance || (this._instance = new this());
   }

   private escucharSockets() {
      console.log('Escuchando conexiones');

      this.io.on('connection', cliente => {
         console.log('Cliente conectado');

         //mensajes
         socket.mensaje(cliente, this.io);

         socket.desconectar(cliente);
      });
   }

   //metodo para inicializar el servidor
   start(callback: any) {
      this.httpSever.listen(this.port, callback)
   }

}