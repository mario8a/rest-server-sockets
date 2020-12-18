import { Usuario } from './usuario';
// Almacena la logica de todos los usuarios
// Procesos para agregar, mandar mensaje...

export class UsuariosLista {

   private lista: Usuario[] = [];

   constructor() {}

   // Agregar un usuario -- Este ya debe estar creado
   public agregar(usuario: Usuario) {
      this.lista.push(usuario);
      console.log(this.lista);
      return usuario;
   }

   public actualizarNombre(id: string, nombre: string) {

      for(let usuario of this.lista) {

         if(usuario.id === id) {
            usuario.nombre = nombre;
            break;
         }
      }

      console.log('=== actualizando usuario');
      console.log(this.lista);

   }

   // Obtener lista de usuarios
   public getLista() {
      return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre');
   }

   //Obtener un usuario
   public getUsuario(id: string) {
      return this.lista.find(usuario => usuario.id === id);
   }

   // Obtener usuarios en una sala en particular
   public getUsuariosEnSala(sala: string) {
      return this.lista.filter(usuario => usuario.sala === sala);
   }

   // Borrar un usuario cuando deja la sala
   public borrarUsuario(id: string) {
      const tempUsuario = this.getUsuario(id);

      this.lista = this.lista.filter(usuario => usuario.id !== id);

      // console.log(this.lista);

      return tempUsuario;
   }
}