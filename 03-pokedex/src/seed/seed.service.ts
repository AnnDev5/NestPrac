import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke.response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ){}

  async executedSeed(){
    // Para eliminar los registros cada vez que se usa la funcion 
    await this.pokemonModel.deleteMany({});
    
    //Ejecucion de datos recomendada
    //Injecction de dependencias
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10000')
    const pokemonToInsert: {name: string, no: number}[] = [];
    data.results.forEach(({name, url})=>{
      const segments = url.split('/');
      const no = +segments[segments.length -2];
      pokemonToInsert.push({name,no})// [{name: bulbasur, no: 1}]
    });
    //Insert into pokemons({name, no})
    //{name: bulbasur, no: 10}
   await this.pokemonModel.insertMany(pokemonToInsert);
   return 'Seed Executed'


  //Segunda Forma de Hacer inserccion un poco mas eficiente que la primera forma
  /*
    // Para eliminar los registros cada vez que se usa la funcion 
    await this.pokemonModel.deleteMany({});

    //Cuando usamos este comando creamos una dependencia oculta 
    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
    
    const insertPromisesArray = []

    
    data.results.forEach(({name, url})=>{
      const segments = url.split('/');
      const no: number = +segments[segments.length-2];
      insertPromisesArray.push(this.pokemonModel.create({name, no}));
    });
    
    await Promise.all(insertPromisesArray)
  }*/
  //Primera  forma de hacer
    /*data.results.forEach(async({name, url})=>{
      //console.log({name, url})
      const segments = url.split('/');
      const no: number = +segments[segments.length-2]
      const pokemon = await this.pokemonModel.create({name, no})
      console.log({name, no})
    })
    return 'Seed Executed';*/
  //Segunda Forma de Hacer
 }
}