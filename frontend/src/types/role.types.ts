/**
 * Tipuri pentru roluri și permisiuni
 */

export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Permission[];
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: number;
  name: string;
  description: string;
  group: string;
}

export interface CreateRoleDto {
  name: string;
  description: string;
  permissionIds: number[];
}

export interface UpdateRoleDto {
  name?: string;
  description?: string;
  permissionIds?: number[];
}

export interface RoleListResponse {
  items: Role[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PermissionGroup {
  name: string;
  permissions: Permission[];
}

export interface RoleFilters {
  search?: string;
  isSystem?: boolean;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
  page?: number;
  pageSize?: number;
}
