import { UserRole } from 'src/app/shared/enums/user-role';

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  enabled: boolean;
}
