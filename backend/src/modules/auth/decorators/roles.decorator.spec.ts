import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY, Roles } from './roles.decorator';

// Mock UserRole enum instead of importing it
const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
  OPERATOR: 'operator',
};

jest.mock('@nestjs/common', () => ({
  SetMetadata: jest.fn().mockReturnValue('metadata-result'),
}));

describe('Roles Decorator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call SetMetadata with correct parameters', () => {
    const roles = [UserRole.ADMIN, UserRole.OPERATOR];
    Roles(...roles);

    expect(SetMetadata).toHaveBeenCalledWith(ROLES_KEY, roles);
  });

  it('should work with a single role', () => {
    Roles(UserRole.ADMIN);

    expect(SetMetadata).toHaveBeenCalledWith(ROLES_KEY, [UserRole.ADMIN]);
  });

  it('should work with multiple roles', () => {
    Roles(UserRole.ADMIN, UserRole.OPERATOR, UserRole.USER);

    expect(SetMetadata).toHaveBeenCalledWith(ROLES_KEY, [
      UserRole.ADMIN,
      UserRole.OPERATOR,
      UserRole.USER,
    ]);
  });

  it('should work with no roles', () => {
    Roles();

    expect(SetMetadata).toHaveBeenCalledWith(ROLES_KEY, []);
  });
});
