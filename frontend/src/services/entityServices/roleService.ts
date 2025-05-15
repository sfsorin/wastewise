import api from '../api';
import {
  Role,
  Permission,
  CreateRoleDto,
  UpdateRoleDto,
  RoleListResponse,
  PermissionGroup,
  RoleFilters,
} from '../../types/role.types';

const BASE_URL = '/roles';
const PERMISSIONS_URL = '/permissions';

/**
 * Serviciu pentru gestionarea rolurilor și permisiunilor
 */
export const roleService = {
  /**
   * Obține lista de roluri cu filtrare și paginare
   * @param filters Filtre pentru listă
   */
  getRoles: (filters?: RoleFilters): Promise<RoleListResponse> => {
    return api.get(BASE_URL, filters);
  },

  /**
   * Obține un rol după ID
   * @param id ID-ul rolului
   */
  getRoleById: (id: number): Promise<Role> => {
    return api.get(`${BASE_URL}/${id}`);
  },

  /**
   * Creează un rol nou
   * @param roleData Date pentru rolul nou
   */
  createRole: (roleData: CreateRoleDto): Promise<Role> => {
    return api.post(BASE_URL, roleData);
  },

  /**
   * Actualizează un rol existent
   * @param id ID-ul rolului
   * @param roleData Date pentru actualizare
   */
  updateRole: (id: number, roleData: UpdateRoleDto): Promise<Role> => {
    return api.put(`${BASE_URL}/${id}`, roleData);
  },

  /**
   * Șterge un rol
   * @param id ID-ul rolului
   */
  deleteRole: (id: number): Promise<void> => {
    return api.del(`${BASE_URL}/${id}`);
  },

  /**
   * Obține toate permisiunile
   */
  getAllPermissions: (): Promise<Permission[]> => {
    return api.get(PERMISSIONS_URL);
  },

  /**
   * Obține permisiunile grupate
   */
  getPermissionGroups: (): Promise<PermissionGroup[]> => {
    return api.get(`${PERMISSIONS_URL}/groups`);
  },

  /**
   * Asignează permisiuni unui rol
   * @param roleId ID-ul rolului
   * @param permissionIds ID-urile permisiunilor
   */
  assignPermissions: (roleId: number, permissionIds: number[]): Promise<Role> => {
    return api.post(`${BASE_URL}/${roleId}/permissions`, { permissionIds });
  },

  /**
   * Revocă permisiuni de la un rol
   * @param roleId ID-ul rolului
   * @param permissionIds ID-urile permisiunilor
   */
  revokePermissions: (roleId: number, permissionIds: number[]): Promise<Role> => {
    return api.del(`${BASE_URL}/${roleId}/permissions`, { data: { permissionIds } });
  },
};

export default roleService;
