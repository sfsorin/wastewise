import { createConnection } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Role } from '../modules/users/entities/role.entity';
import { Permission } from '../modules/users/entities/permission.entity';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

// Încărcăm variabilele de mediu
config();

const configService = new ConfigService();

async function main() {
  console.log('Verificare utilizatori în baza de date...');

  const connection = await createConnection({
    type: 'postgres',
    host: configService.get('DB_HOST') || 'localhost',
    port: parseInt(configService.get('DB_PORT') || '5432', 10),
    username: configService.get('DB_USERNAME') || 'postgres',
    password: configService.get('DB_PASSWORD') || 'postgres',
    database: configService.get('DB_DATABASE') || 'wastewise',
    entities: [User, Role, Permission],
    synchronize: false,
  });

  try {
    // Verificăm utilizatorii
    const userRepository = connection.getRepository(User);
    const users = await userRepository.find({ relations: ['roles', 'roles.permissions'] });

    if (users.length === 0) {
      console.log('Nu există utilizatori în baza de date.');
    } else {
      console.log(`Există ${users.length} utilizatori în baza de date:`);
      users.forEach((user, index) => {
        console.log(`\nUtilizator ${index + 1}:`);
        console.log(`ID: ${user.id}`);
        console.log(`Username: ${user.username}`);
        console.log(`Email: ${user.email}`);
        console.log(`Nume complet: ${user.fullName}`);
        console.log(`Rol: ${user.role}`);
        console.log(`Status: ${user.status}`);
        console.log(`Activ: ${user.isActive}`);
        console.log(`Ultima autentificare: ${user.lastLogin}`);
        console.log(`Creat la: ${user.createdAt}`);
        console.log(`Actualizat la: ${user.updatedAt}`);
        
        if (user.roles && user.roles.length > 0) {
          console.log('Roluri:');
          user.roles.forEach(role => {
            console.log(`  - ${role.name}: ${role.description}`);
            
            if (role.permissions && role.permissions.length > 0) {
              console.log('    Permisiuni:');
              role.permissions.forEach(permission => {
                console.log(`      * ${permission.name}: ${permission.description}`);
              });
            }
          });
        } else {
          console.log('Nu are roluri asignate.');
        }
      });
    }

    // Verificăm rolurile
    const roleRepository = connection.getRepository(Role);
    const roles = await roleRepository.find({ relations: ['permissions'] });

    console.log(`\n\nExistă ${roles.length} roluri în baza de date:`);
    roles.forEach((role, index) => {
      console.log(`\nRol ${index + 1}:`);
      console.log(`ID: ${role.id}`);
      console.log(`Nume: ${role.name}`);
      console.log(`Descriere: ${role.description}`);
      
      if (role.permissions && role.permissions.length > 0) {
        console.log(`Permisiuni (${role.permissions.length}):`);
        role.permissions.forEach(permission => {
          console.log(`  - ${permission.name}: ${permission.description}`);
        });
      } else {
        console.log('Nu are permisiuni asignate.');
      }
    });

  } catch (error) {
    console.error('Eroare la verificarea utilizatorilor:', error);
  } finally {
    await connection.close();
  }
}

main().catch(error => {
  console.error('Eroare la executarea scriptului:', error);
  process.exit(1);
});
