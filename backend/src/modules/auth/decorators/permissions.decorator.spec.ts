import { SetMetadata } from '@nestjs/common';
import { PERMISSIONS_KEY, Permissions } from './permissions.decorator';

jest.mock('@nestjs/common', () => ({
  SetMetadata: jest.fn().mockReturnValue('metadata-result'),
}));

describe('Permissions Decorator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call SetMetadata with correct parameters', () => {
    const permissions = ['create:users', 'update:users'];
    Permissions(...permissions);

    expect(SetMetadata).toHaveBeenCalledWith(PERMISSIONS_KEY, permissions);
  });

  it('should work with a single permission', () => {
    Permissions('create:users');

    expect(SetMetadata).toHaveBeenCalledWith(PERMISSIONS_KEY, ['create:users']);
  });

  it('should work with multiple permissions', () => {
    Permissions('create:users', 'read:users', 'update:users');

    expect(SetMetadata).toHaveBeenCalledWith(PERMISSIONS_KEY, [
      'create:users',
      'read:users',
      'update:users',
    ]);
  });

  it('should work with no permissions', () => {
    Permissions();

    expect(SetMetadata).toHaveBeenCalledWith(PERMISSIONS_KEY, []);
  });
});
