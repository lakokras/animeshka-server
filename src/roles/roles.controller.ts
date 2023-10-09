import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}
    
    @Post()
    create(@Body() dto: createRoleDto) {
        return this.rolesService.createRole(dto)
    }

    @Get('/:value')
    getByValue(@Param('value') value) {
        return this.rolesService.getRoleByValue(value)
    }
}
