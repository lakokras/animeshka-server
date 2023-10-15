import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Anime } from 'src/animes/animes.model';
import { UserAnimes } from 'src/animes/user-animes.model';
import { AnimesModule } from 'src/animes/animes.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Anime, UserAnimes]),
    RolesModule,
    AnimesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}
