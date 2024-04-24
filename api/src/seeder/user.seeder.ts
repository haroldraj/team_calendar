// In your UserService or a separate seeder file
import { UserService } from '../user/user.service';

export async function seedUser(userService: UserService) {
  const userEmail = 'admin@email.com';
  const userExists = await userService.findUserByEmail(userEmail);
  if (!userExists) {
    await userService.create({
      name: 'Administrator',
      email: userEmail,
      password: 'Admin@Password1',
      roleId: 1, // replace with a secure password
      // add other fields as necessary
    });
    console.log('Seeded user created');
  } else {
    console.log('Seeded user already exists');
  }
}
