import { ApiProperty } from '@nestjs/swagger';

export class UserListType {
  @ApiProperty({ example: 'c3adcab6-d403-4563-80ff-dae1e0fe4e30' })
  id: string;

  @ApiProperty({ example: 'test@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Harry' })
  firstName: string;

  @ApiProperty({ example: 'Potter' })
  lastName: string;

  @ApiProperty({ example: 21 })
  age: number;
}

export class GetUserListResponseDto {
  total: number;
  data: UserListType[];
}
