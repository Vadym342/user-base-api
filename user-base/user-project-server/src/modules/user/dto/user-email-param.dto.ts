import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';

export class UserEmailParamDto {
  @ApiProperty({
    name: 'email',
    type: 'string',
    required: true,
    example: 'abcd@gmail.com',
    description: 'User email',
  })
  @IsEmail()
  @MaxLength(96, { message: 'Email length should be less than 96 symbols' })
  @IsString()
  email: string;
}
