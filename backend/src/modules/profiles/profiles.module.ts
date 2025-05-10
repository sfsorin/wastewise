import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    UsersModule,
  ],
  exports: [TypeOrmModule],
})
export class ProfilesModule {}
