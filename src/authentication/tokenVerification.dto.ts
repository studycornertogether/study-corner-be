import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class TokenVerificationDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsOptional()
  referralCode: string;
}
