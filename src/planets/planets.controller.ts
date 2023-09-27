import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import { CreatePlanetDTO } from './dto/create-planet.dto';
import RequestWithUser from '../authentication/requestWithUser.interface';

@Controller('planets')
@ApiTags('planets')
@UseGuards(JwtAuthenticationGuard)
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  async getPlanets(@Req() request: RequestWithUser) {
    return await this.planetsService.getPlanets(request.user);
  }

  @Post()
  async createPlanet(
    @Body() data: CreatePlanetDTO,
    @Req() request: RequestWithUser,
  ) {
    return this.planetsService.createPlanet(data, request.user);
  }
}
