/**
 * Export-uri pentru toate serviciile de entități
 */

export { default as userService } from './userService';
export { default as roleService } from './roleService';
export { default as geographicService } from './geographicService';
export { default as clientService } from './clientService';

// Export toate serviciile într-un singur obiect
import userService from './userService';
import roleService from './roleService';
import geographicService from './geographicService';
import clientService from './clientService';

export default {
  userService,
  roleService,
  geographicService,
  clientService,
};
