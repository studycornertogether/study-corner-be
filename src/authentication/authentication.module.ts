import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { GoogleAuthenticationService } from './googleAuthentication.service';
import { GoogleAuthenticationController } from './googleAuthentication.controller';
import { AuthenticationController } from './authentication.controller';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';

@Module({
  imports: [UsersModule, ConfigModule, JwtModule.register({})],
  providers: [
    AuthenticationService,
    JwtStrategy,
    GoogleAuthenticationService,
    JwtRefreshTokenStrategy,
  ],
  controllers: [GoogleAuthenticationController, AuthenticationController],
})
export class AuthenticationModule {}
