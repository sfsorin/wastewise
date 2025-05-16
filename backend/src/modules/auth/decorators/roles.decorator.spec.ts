import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY, Roles } from './roles.decorator';

jest.mock('@nestjs/common', () => ({
  SetMetadata: jest.fn(),
}));

describe('Roles Decorator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call SetMetadata with correct parameters', () => {
    const roles = ['admin', 'manager'];
    Roles(...roles);

    expect(SetMetadata).toHaveBeenCalledWith(ROLES_KEY, roles);
  });

  it('should work with a single role', () => {
    Roles('admin');

    expect(SetMetadata).toHaveBeenCalledWith(ROLES_KEY, ['admin']);
  });

  it('should work with multiple roles', () => {
    Roles('admin', 'manager', 'user');

    expect(SetMetadata).toHaveBeenCalledWith(ROLES_KEY, ['admin', 'manager', 'user']);
  });

  it('should work with no roles', () => {
    Roles();

    expect(SetMetadata).toHaveBeenCalledWith(ROLES_KEY, []);
  });
});
