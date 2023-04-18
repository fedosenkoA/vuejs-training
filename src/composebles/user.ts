export interface User {
  id: number;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  deleted_at?: string;
  email_verified_at: string;
  roles: [Role];
  prepareToDeletion?: boolean;
  active?: boolean;
}

export interface Role {
  id: number;
  title: string;
  name: string;
}
