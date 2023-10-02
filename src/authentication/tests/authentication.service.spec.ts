import { AuthenticationService } from '../authentication.service';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../users/user.entity';
import { UsersService } from '../../users/users.service';
import { mockedConfigService } from '../../utils/mocks/config.service';
import { mockedJwtService } from '../../utils/mocks/jwt.service';
import { UserReferral } from '../../users/user-referal.entity';
import { mockedUser } from './user.mock';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AuthenticationController } from '../authentication.controller';
import * as request from 'supertest';

describe('The AuthenticationService', () => {
  let app: INestApplication;
  let userData: User;
  let findUser: jest.Mock;
  beforeEach(async () => {
    userData = {
      ...mockedUser,
    };
    findUser = jest.fn().mockResolvedValue(userData);
    const usersRepository = {
      findOne: findUser,
      create: jest.fn().mockResolvedValue(userData),
      save: jest.fn().mockReturnValue(Promise.resolve()),
    };
    const module = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        UsersService,
        AuthenticationService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
        {
          provide: getRepositoryToken(UserReferral),
          useValue: {},
        },
      ],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  describe('when registering', () => {
    describe('and using valid data', () => {
      it('should respond with the data of the user', () => {
        const expectedData = {
          ...userData,
        };
        return request(app.getHttpServer())
          .post('/google-authentication')
          .send({
            token:
              'ya29.a0AfB_byDDIu98iekK-bOtcsv0ReiDvKPexHhY0VR1MNQm7cBFogTXeMeUNp5JINWwYT-oV_pGUIhG09xGnB7podFk2Vw0Ma0HtkfViv0icmnGromillBI7JIMD0blZZT9WpuJeS8C2wn6qnUOFfjeYD68TY4hWV2Ej50aCgYKAeMSARASFQGOcNnCbypxzuhAHqR89q2iI_y-AQ0170',
          })
          .expect(201)
          .expect(expectedData);
      });
    });
  });
});
