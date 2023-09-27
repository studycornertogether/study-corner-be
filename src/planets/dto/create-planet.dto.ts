import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlanetDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
