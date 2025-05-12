import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserStatus } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verificare dacă există deja un utilizator cu același username sau email
    const existingByUsername = await this.usersRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existingByUsername) {
      throw new ConflictException(`Există deja un utilizator cu numele ${createUserDto.username}`);
    }

    const existingByEmail = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingByEmail) {
      throw new ConflictException(
        `Există deja un utilizator cu adresa de email ${createUserDto.email}`,
      );
    }

    const user = this.usersRepository.create(createUserDto);

    // Generare nume complet dacă nu este furnizat dar avem prenume și nume
    if (!user.fullName && user.firstName && user.lastName) {
      user.fullName = `${user.firstName} ${user.lastName}`;
    }

    // Setare status implicit dacă nu este furnizat
    if (!user.status) {
      user.status = UserStatus.ACTIVE;
    }

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: [
        'id',
        'username',
        'firstName',
        'lastName',
        'fullName',
        'email',
        'role',
        'status',
        'isActive',
        'lastLogin',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: [
        'id',
        'username',
        'firstName',
        'lastName',
        'fullName',
        'email',
        'role',
        'status',
        'isActive',
        'lastLogin',
        'createdAt',
        'updatedAt',
      ],
    });

    if (!user) {
      throw new NotFoundException(`Utilizatorul cu ID-ul ${id} nu a fost găsit`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      select: [
        'id',
        'username',
        'firstName',
        'lastName',
        'fullName',
        'email',
        'role',
        'status',
        'isActive',
        'lastLogin',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { username },
      select: [
        'id',
        'username',
        'firstName',
        'lastName',
        'fullName',
        'email',
        'role',
        'status',
        'isActive',
        'lastLogin',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Verificare dacă se actualizează username-ul și dacă există deja un utilizator cu acest username
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingByUsername = await this.usersRepository.findOne({
        where: { username: updateUserDto.username },
      });
      if (existingByUsername) {
        throw new ConflictException(
          `Există deja un utilizator cu numele ${updateUserDto.username}`,
        );
      }
    }

    // Verificare dacă se actualizează email-ul și dacă există deja un utilizator cu acest email
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingByEmail = await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingByEmail) {
        throw new ConflictException(
          `Există deja un utilizator cu adresa de email ${updateUserDto.email}`,
        );
      }
    }

    Object.assign(user, updateUserDto);

    // Generare nume complet dacă s-a actualizat prenumele sau numele
    if ((updateUserDto.firstName || updateUserDto.lastName) && !updateUserDto.fullName) {
      const firstName = updateUserDto.firstName || user.firstName;
      const lastName = updateUserDto.lastName || user.lastName;
      if (firstName && lastName) {
        user.fullName = `${firstName} ${lastName}`;
      }
    }

    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}
