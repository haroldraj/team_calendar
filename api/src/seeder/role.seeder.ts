import { RoleService } from '../role/role.service';

export async function seedRole(roleService: RoleService) {
  let roleName = 'admin';
  let roleExists = await roleService.findRoleByName(roleName);
  if (!roleExists) {
    await roleService.create({
      name: roleName,
      // add other fields as necessary
    });
    console.log('Seeded role admin created');
  } else {
    console.log('Seeded role admin already exists');
  }
  roleName = 'user';
  roleExists = await roleService.findRoleByName(roleName);
  if (!roleExists) {
    await roleService.create({
      name: roleName,
      // add other fields as necessary
    });
    console.log('Seeded role user created');
  } else {
    console.log('Seeded role user already exists');
  }
}
