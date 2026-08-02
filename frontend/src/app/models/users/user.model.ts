import { UserRole } from 'src/app/shared/enums/user-role';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: UserRole;
  enabled: boolean;
}
