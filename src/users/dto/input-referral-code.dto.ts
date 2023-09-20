import { IsOptional, IsString } from 'class-validator';

export class InputReferralCodeDTO {
  @IsString()
  @IsOptional()
  referralCode: string;
}
