import { Injectable, NotImplementedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Planet } from './planet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { CreatePlanetDTO } from './dto/create-planet.dto';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private planetRepository: Repository<Planet>,
  ) {}

  async getPlanets(user: User) {
    const result = await this.planetRepository.find({
      where: { userId: user.id },
    });

    return { result, message: 'Success.' };
  }

  async createPlanet(createPlanetDTO: CreatePlanetDTO, user: User) {
    const { name } = createPlanetDTO;
    const planet = this.planetRepository.create({ name, user });
    try {
      await this.planetRepository.save(planet);
    } catch (err) {
      throw new NotImplementedException(
        'Can not create your planet, please try again later.',
      );
    }
    return {
      message: 'Hooray! Your planet is created successfully.',
      result: planet,
    };
  }
}
