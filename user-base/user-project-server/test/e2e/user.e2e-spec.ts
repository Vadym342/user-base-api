import { HttpServer, HttpStatus, INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import * as request from 'supertest';
import { EntityManager, In, Not } from 'typeorm';

import { entityUsers } from '@src/constants/seed';
import { globalExceptionFilters } from '@src/exceptions';
import { globalValidationPipe } from '@src/pipe/global-validation.pipe';

import { JwtPayload } from '@modules/auth/auth-jwt.interface';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { GetUserListResponseDto } from '@modules/user/dto/get-user-list.response.dto';
import { User } from '@modules/user/entities/user.entity';
import { UserModule } from '@modules/user/user.module';

import { CommonTestingModule } from '@test/common-testing.module';
import { cognitoEmail, mockLogger } from '@test/mocks/logger.mock';
import { AuthHeadersOptions } from '@test/types/test.types';
import { useTableCleanup } from '@test/utils/db.util';

describe('User (e2e)', () => {
  const decode = jest.fn<Pick<JwtPayload, 'cognito:email'>, [string]>();

  let application: INestApplication;
  let entityManager: EntityManager;
  let server: HttpServer;
  let requestHeaders: AuthHeadersOptions;

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [CommonTestingModule, UserModule],
    })
      .overrideProvider(JwtService)
      .useValue({ decode })
      .compile();

    application = testingModule
      .createNestApplication()
      .useGlobalFilters(...globalExceptionFilters)
      .useGlobalPipes(globalValidationPipe);

    application.useLogger(mockLogger);

    server = application.getHttpServer();
    entityManager = application.get(EntityManager);

    useContainer(application.select(UserModule), { fallbackOnErrors: true });
    await application.init();
  });

  afterEach(async () => {
    jest.resetAllMocks();

    const { clearTable } = useTableCleanup(entityManager);

    await clearTable(User, {
      id: Not(In(entityUsers.development.map((user) => user.id))),
    });
  });

  afterAll(async () => {
    await application.close();
  });

  beforeEach(() => {
    decode.mockReturnValue({ 'cognito:email': cognitoEmail });
    requestHeaders = {
      customerId: '569ee7d7-fb10-416c-9355-ba8ad8e6af0d',
      Authorization: 'Bearer <jwt token>',
    };
  });

  describe('POST /user', () => {
    let createUserBody: CreateUserDto;

    beforeEach(() => {
      createUserBody = {
        email: 'test@gmail.com',
        age: 18,
        firstName: 'Templar',
        lastName: 'Assassin',
        password: '123456',
      };
    });

    it('should fail with status 400 if fields not provided', async () => {
      const response = await request(server).post('/user').set(requestHeaders).send({});

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: HttpStatus.BAD_REQUEST,
          errors: expect.arrayContaining([
            expect.objectContaining({ errorCode: 10206 }),
            expect.objectContaining({ errorCode: 10203 }),
            expect.objectContaining({ errorCode: 10207 }),
            expect.objectContaining({ errorCode: 10209 }),
            expect.objectContaining({ errorCode: 10211 }),
          ]),
        }),
      );
      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should pass with status 201 if user successfully created', async () => {
      const response = await request(server).post('/user').set(requestHeaders).send(createUserBody);

      const userFromDb = await entityManager.findOne(User, { where: { email: createUserBody.email } });

      expect(userFromDb).toStrictEqual<User>(
        expect.objectContaining({
          email: createUserBody.email,
          age: createUserBody.age,
          firstName: createUserBody.firstName,
          lastName: createUserBody.lastName,
        }),
      );
      expect(response.statusCode).toBe(HttpStatus.CREATED);
    });
  });

  describe('GET /user', () => {
    it('should pass with status 200, and return list of users', async () => {
      const response = await request(server).get('/user').set(requestHeaders);

      expect(response.body).toStrictEqual<GetUserListResponseDto>({
        total: 2,
        data: [
          {
            age: 18,
            email: 'aaa@gmail.com',
            firstName: 'Harry',
            id: '569ee7d7-fb10-416c-9355-ba8ad8e6af0d',
            lastName: 'Potter',
          },
          {
            age: 21,
            email: 'blabla@balfd.com',
            firstName: 'Albus',
            id: '00d4b716-6bba-4101-9d51-5d98af93e2a1',
            lastName: 'Dumbledore',
          },
        ],
      });
      expect(response.statusCode).toBe(HttpStatus.OK);
    });
  });
});
