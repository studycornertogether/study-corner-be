import { User } from '../../users/user.entity';

export const mockedUser: User = {
  id: 1,
  email: 'user@email.com',
  name: 'John',
  createdDate: new Date(),
  updatedDate: new Date(),
  uuid: 'ABC1234125',
  referralCode: 'ABC123123',
};
