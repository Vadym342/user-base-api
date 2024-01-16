import { IsEmail, IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(96, { message: 'Email length should be less than 96 symbols' })
  @IsString()
  email: string;

  @MaxLength(100, { message: 'FirstName length should be less than 100 symbols' })
  @IsString()
  firstName: string;

  @MaxLength(100, { message: 'LastName length should be less than 100 symbols' })
  @IsString()
  lastName: string;

  @Max(100, { message: 'Age should be less than 100 years' })
  @Min(18, { message: 'Age should be more than 18 years' })
  @IsInt()
  age: number;

  @MaxLength(20, { message: 'Password length should be less than 20 symbols' })
  @MinLength(5, { message: 'Password length should be more than symbols' })
  @IsString()
  password: string;
}
