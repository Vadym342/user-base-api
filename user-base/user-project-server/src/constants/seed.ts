import { User } from '@modules/user/entities/user.entity';

type NodeEnvType = 'development' | 'test';

export const entityUsers: Record<NodeEnvType, Partial<User>[]> = {
  development: [
    {
      id: '569ee7d7-fb10-416c-9355-ba8ad8e6af0d',
      email: 'aaa@gmail.com',
      age: 18,
      firstName: 'Harry',
      lastName: 'Potter',
      password: '123456',
    },
    {
      id: '00d4b716-6bba-4101-9d51-5d98af93e2a1',
      email: 'blabla@balfd.com',
      age: 21,
      firstName: 'Albus',
      lastName: 'Dumbledore',
      password: '123456',
    },
  ],
  test: [],
};

entityUsers.test = entityUsers.development;
