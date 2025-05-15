/**
 * Tipuri pentru utilizatori
 */

import { Role } from './role.types';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  roles: Role[];
  permissions: string[];
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface UserProfile {
  id: number;
  userId: number;
  phoneNumber?: string;
  address?: string;
  city?: string;
  county?: string;
  postalCode?: string;
  company?: string;
  position?: string;
  bio?: string;
  avatarUrl?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  dashboard: {
    widgets: string[];
    layout: Record<string, unknown>;
  };
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleIds: number[];
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
  roleIds?: number[];
}

export interface UpdateUserProfileDto {
  phoneNumber?: string;
  address?: string;
  city?: string;
  county?: string;
  postalCode?: string;
  company?: string;
  position?: string;
  bio?: string;
  preferences?: Partial<UserPreferences>;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserListResponse {
  items: User[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface UserFilters {
  search?: string;
  roleId?: number;
  isActive?: boolean;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
  page?: number;
  pageSize?: number;
}
