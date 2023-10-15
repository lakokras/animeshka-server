import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe, Request, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { AddAnimeDto } from './dto/add-anime.dto';


@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("ADMIN")
    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }

    @ApiOperation({summary: 'Set role'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto)
    }

    @ApiOperation({summary: 'Get animes'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Get('/anime/:id')
    getUserAnimes(@Param('id') id) {
        return this.usersService.getUserAnimes(id)
    }

    @ApiOperation({summary: 'Set anime'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Post('/anime')
    addAnime(@Request() req,@Body() dto: AddAnimeDto) {
        return this.usersService.addAnime(req.user.id, dto)
    }

    @ApiOperation({summary: 'Delete anime'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Delete('/anime/:id')
    deleteAnime(@Request() req, @Param('id') animeId) {
        return this.usersService.deleteAnime(req.user.id, animeId)
    }

    @ApiOperation({summary: 'Ban user'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto)
    }
}
