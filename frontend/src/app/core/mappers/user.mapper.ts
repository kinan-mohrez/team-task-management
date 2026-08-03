import { UserResponse } from '../dto/users/user-response.model';
import { User } from 'src/app/models/users/user.model';

export class UserMapper {
  public static fromResponse(userResponse: UserResponse): User {
    return {
      id: userResponse.id,
      firstName: userResponse.firstName,
      lastName: userResponse.lastName,
      username: userResponse.username,
      email: userResponse.email,
      role: userResponse.role,
      enabled: userResponse.enabled,
    };
  }

  public static fromResponses(userResponses: UserResponse[]): User[] {
    return userResponses.map((userResponse: UserResponse) =>
      this.fromResponse(userResponse),
    );
  }
}

export { User };
