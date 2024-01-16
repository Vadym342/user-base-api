import { Body, Controller, HttpCode, Delete, Get, HttpStatus, Logger, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

import { CreateUserDto } from './dto/create-user.dto';
import { GetUserResponseType } from './dto/get-one-user.response.dto';
import { GetUserListResponseDto } from './dto/get-user-list.response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEmailParamDto } from './dto/user-email-param.dto';
import { UserIdDto } from './dto/user-id-param.dto';
import { UserValidatorService } from './services/user-validator.service';
import { UserService } from './services/user.service';
import { DeleteUserAPIDocumentation } from './swagger/delete-user-documentation.decorator';
import { GetUserAPIDocumentation } from './swagger/get-one-user-documentation.decorator';
import { GetUserListAPIDocumentation } from './swagger/get-user-list-documentation.decorator';
import { PostUserAPIDocumentation } from './swagger/post-user-documentation.decorator';
import { UpdateUserAPIDocumentation } from './swagger/update-user-documentation.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
    private readonly userValidatorService: UserValidatorService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @PostUserAPIDocumentation()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    this.logger.log('Creating User');

    await this.userValidatorService.doesUserAlreadyCreated(createUserDto.email);

    return this.userService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @GetUserListAPIDocumentation()
  async getAllUsers(): Promise<GetUserListResponseDto> {
    this.logger.log('Getting all Users');

    return this.userService.getAllUsers();
  }

  @Get(':email')
  @UseGuards(JwtAuthGuard)
  @GetUserAPIDocumentation()
  async getOneUser(@Param() { email }: UserEmailParamDto): Promise<GetUserResponseType> {
    this.logger.log('Getting one User');

    await this.userValidatorService.doesUserExist(null, email);

    return this.userService.getOneUser(email);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @UpdateUserAPIDocumentation()
  async updateUser(@Param() { id }: UserIdDto, @Body() updateUserDto: UpdateUserDto): Promise<void> {
    this.logger.log('Updating User');

    await this.userValidatorService.doesUserExist(id);

    await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @DeleteUserAPIDocumentation()
  async deleteUser(@Param() { id }: UserIdDto): Promise<void> {
    this.logger.log('Deleting User');

    await this.userValidatorService.doesUserExist(id);

    await this.userService.deleteUser(id);
  }
}
