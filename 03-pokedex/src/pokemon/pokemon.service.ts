import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    //Implementacion propia de Nest que nos permite trabajar con los Modelos que definimos

    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ){}


  //Las Insercciones a base de datos son asincronas
  async create(createPokemonDto: CreatePokemonDto) {
    //Con estas lineas tambien estamos realizando validaciones
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try{
      const pokemon = await  this.pokemonModel.create(createPokemonDto);
      return pokemon;
    }catch(error){
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }
  // term de termino de busqueda
  async findOne(term: string) {
    let pokemon: Pokemon;
    //Condicion si esto no es un numero
    if( !isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({ no: term})
    }
    //MongoID
    //isValidObjectId es una validacion de MongoId
    if(!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term)
    }
    //Name
    //trim permite eliminar espacios adelante o atras
    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({name:term.toLowerCase().trim()})
    }

    if(!pokemon) throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`)

    return pokemon;
    //return `This action returns a #${id} pokemon`;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if(updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    
    try{
      await pokemon.updateOne(updatePokemonDto, {new: true})
      return { ...pokemon.toJSON(), ...updatePokemonDto}

    }catch(error){
      this.handleExceptions(error);
    }
    
    }

  async remove(id: string) {
    const pokemon = await this.findOne(id)
    await pokemon.deleteOne();
  }

//Manejo de excepciones no controladas
  private handleExceptions(error:any){
    if(error.code === 11000){
      throw new BadRequestException(`Pokemon exist in db ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error)
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`)
  }
}
