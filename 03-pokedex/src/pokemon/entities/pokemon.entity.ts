//Las entities son las representaciones de las tablas que 
//llenaremos en la base datos 
//Establecer las reglas de negocio es decir como seran las clases 
//En mongodb se le denomina colexion 
//Una entidad tiene relacion con las tablas de datos
//Mongo genera un id unico para cada registro
//Schema permite identificar que se trata de una tabla de base de datos

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document{
    
    // id: string //mongo me lo da
    @Prop({
        unique: true,
        index:true
    })
    name: string;

    @Prop({
        unique: true,
        index:true
    })
    no: number;

}
//Para exportar la clase como un esquema

export const PokemonSchema = SchemaFactory.createForClass(Pokemon)
