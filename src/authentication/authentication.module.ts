import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { GoogleAuthenticationService } from './googleAuthentication.service';
import { GoogleAuthenticationController } from './googleAuthentication.controller';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}`,
        },
      }),
    }),
  ],
  providers: [AuthenticationService, JwtStrategy, GoogleAuthenticationService],
  controllers: [GoogleAuthenticationController, AuthenticationController],
})
export class AuthenticationModule {}
