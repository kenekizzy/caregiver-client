export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
  permissions: string[];
  lastLogin: Date;
}

export enum AdminRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  SUPPORT = 'support'
}

export interface AdminSection {
  id: string;
  title: string;
  icon: string;
  path: string;
  children?: AdminSection[];
  requiredPermission: string;
}

export interface AdminNavigation {
  sections: AdminSection[];
  currentUser: AdminUser;
  permissions: AdminPermission[];
}

export interface AdminPermission {
  id: string;
  name: string;
  description: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}