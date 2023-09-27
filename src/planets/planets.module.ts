import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './planet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Planet])],
  providers: [PlanetsService],
  controllers: [PlanetsController],
})
export class PlanetsModule {}
