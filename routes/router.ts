import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/socket';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {

   res.json({
      ok: true,
      mensaje: 'Todok bien' 
   })

});

router.post('/mensajes', (req: Request, res: Response) => {

   const cuerpo = req.body.cuerpo;
   const de = req.body.de;

   const payload = {
      de,
      cuerpo
   }

   const server = Server.instance;
   //Enviar un mensaje a todos desde REST Server
   server.io.emit('mensaje-nuevo', payload);

   res.json({
      ok: true,
      mensaje: 'POST - Listo',
      cuerpo,
      de
   })

});

router.post('/mensajes/:id', (req: Request, res: Response) => {

   const cuerpo = req.body.cuerpo;
   const de = req.body.de;
   const id = req.params.id;

   const payload = {
      de,
      cuerpo
   }

   // Conectando servicio rest con el servidor de sockets

   const server = Server.instance;
   // in sirve para emitir un mensaje a un usuairo en particular
   server.io.in(id).emit('mensaje-privado', payload);

   res.json({
      ok: true,
      mensaje: 'POST - Listo',
      cuerpo,
      de,
      id
   })

});

// Servicio para obtener todos los ids de los usuarios

router.get('/usuarios', (req: Request, res: Response) => {

   // Conectando servicio rest con el servidor de sockets

   const server = Server.instance;
   // in sirve para emitir un mensaje a un usuairo en particular
   server.io.clients((err: any, clientes: string[]) => {

      if(err) {
         return res.json({
            ok: false,
            err
         })
      }

      res.json({
         ok: true,
         clientes
      });

   });

   
});

// Obtener usuarios y sus nombres

router.get('/usuarios/detalle', (req: Request, res: Response) => {
   
   


   res.json({
      ok: true,
      clientes: usuariosConectados.getLista()
   });

});

export default router;