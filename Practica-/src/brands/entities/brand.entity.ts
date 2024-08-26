//Como luce la marca de los autos
//Las entitys son la representacion de una tabla mysql Brand
//Entity es la referencia o abstraccion de como estariamos representando la base de datos
//Si hacemos la coneccion con una base datos no debe llevar la palabra Brandentity es decir la extenssion

export class Brand {
  id: string;
  name: string;
  //Fecha de creacion
  createdAt: number;
  //Fecha de actualzacion
  updatedAt?: number;
}
