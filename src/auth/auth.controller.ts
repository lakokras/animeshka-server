import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from 'src/users/users.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService,
        private userService: UsersService) { }

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/auth')
    getProfile(@Request() req) {
       return this.userService.getUserById(req.user.id);
    }
}
