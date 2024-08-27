import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
//En una apliacacion solo debe haber un forRoot
//ForFeatureAsyc debe esperar que la funcion se ejecute  
@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[
    MongooseModule.forFeature([
      {
        //Pokemon.name hace referencia al name de Document
        //En este apartado se debe implementar mas tablas si se tuviera
        name: Pokemon.name,
        schema: PokemonSchema, 
      }
    ])
  ]
})
export class PokemonModule {}
