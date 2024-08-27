import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';
//PartialType permite que tenga las propiedades de CreatePokemon y que estas propiedades sean opcionales al momento de hacer un update

export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
