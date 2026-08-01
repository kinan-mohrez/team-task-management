import { UserRole } from 'src/app/shared/enums/user-role';

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: UserRole;
  enabled: boolean;
}
