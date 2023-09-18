import { IsString } from 'class-validator';

class FindOneParams {
  @IsString()
  uuid: string;
}
