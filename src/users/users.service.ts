import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import {InjectModel} from "@nestjs/sequelize";
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { AddAnimeDto } from './dto/add-anime.dto';
import { AnimesService } from 'src/animes/animes.service';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService,
        private animeService: AnimesService) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue("USER");
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}})
        return users
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {'email': email}, include: {all: true}})
        return user
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findByPk(id, {include: {all: true}})
        const payload = {
            animes: user.animes,
            email: user.email,
            roles: user.roles,
            id: user.id
        }
        return payload
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.roleService.getRoleByValue(dto.value)
        if (role && user) {
            await user.$add('role', role.id)
            return dto
        }
        throw new HttpException("Пользователь или роль не найдены", HttpStatus.NOT_FOUND)
    }

    async addAnime(userId: number, dto: AddAnimeDto) {
        const user = await this.userRepository.findByPk(userId, {include: {all: true}})
        const anime = await this.animeService.getAnimeById(dto.animeId)
        if (!user) {
            throw new HttpException("Пользователь или аниме не найдены", HttpStatus.NOT_FOUND)
        }
        if (anime && user) {
            await user.$add('anime', anime.id)
            return this.getUserAnimes(userId)
        }
        if(!anime && user) {
            await this.animeService.create({id: dto.animeId, title: dto.title})
            await user.$add('anime', dto.animeId)
            return this.getUserAnimes(userId)
        }
        throw new HttpException("Пользователь или аниме не найдены", HttpStatus.NOT_FOUND)
    }

    async deleteAnime(userId: number, animeId: number) {
        const user = await this.userRepository.findByPk(userId, {include: {all: true}})
        const anime = await this.animeService.getAnimeById(animeId)
        if (!user || !anime) {
            throw new HttpException("Пользователь или аниме не найдены", HttpStatus.NOT_FOUND)
        }
        try {
            await user.$remove('anime', anime.id)
            return this.getUserAnimes(userId)
        }
        catch (err) {
            throw new HttpException("Пользователь или аниме не найдены", HttpStatus.NOT_FOUND)
        }
    }

    async getUserAnimes(userId: number) {
        const user = await this.userRepository.findByPk(userId, {include: {all: true}})
        return user.animes
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        user.banned = true
        user.banReason = dto.banReason
        await user.save()
        return user
    }
}
