

export class Usuario {

   // id del socket que se esta conectando
   public id: string;
   public nombre: string;
   public sala: string;

   constructor(id: string){
      this.id = id;
      this.nombre = 'sin-nombre';
      this.sala = 'sin-sala';
   }
}