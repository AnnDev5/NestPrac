import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path'; //node
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
//Todo lo que vaya con palabra modulo va en los imports
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),
    PokemonModule,
    //Establecer la URL de la base de datos
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    CommonModule
  ],
})
export class AppModule {}
