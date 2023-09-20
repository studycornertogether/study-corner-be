import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { google, Auth } from 'googleapis';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../users/user.entity';

@Injectable()
export class GoogleAuthenticationService {
  oauthClient: Auth.OAuth2Client;
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly authenticationService: AuthenticationService,
  ) {
    const clientID = this.configService.get('GOOGLE_AUTH_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_AUTH_CLIENT_SECRET');

    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  async authenticate(token: string, referralCode: string) {
    const userData = await this.getUserData(token);
    const name = userData.name;
    const email = userData.email;
    let user = await this.usersService.getByEmail(email);
    if (!user) {
      user = await this.usersService.createWithGoogle(email, name);
    }

    try {
      await this.usersService.inputReferralCode(user, { referralCode });
    } catch (error) {
      console.warn(error);
    }

    const { accessTokenCookie } = await this.getCookiesForUser(user);
    return {
      accessTokenCookie,
      user,
    };
  }

  async getUserData(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oauthClient.setCredentials({
      access_token: token,
    });

    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient,
    });

    return userInfoResponse.data;
  }

  async getCookiesForUser(user: User) {
    const accessTokenCookie = this.authenticationService.getCookieWithJwtToken(
      user.email,
    );

    return {
      accessTokenCookie,
    };
  }
}
