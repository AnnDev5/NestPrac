import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';
//El objetivo final de un controlador es escuchar solicitudes y devolver respuestas.
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

 
  @Get()
  executeSedd() {
    return this.seedService.executedSeed();
  }
}
