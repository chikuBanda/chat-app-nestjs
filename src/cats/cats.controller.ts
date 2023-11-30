import { Body, Controller, Get, Ip, Param, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
    @Get()
    findAll (): string {
        return JSON.stringify({
            name: "chiku",
            girlfriend_name: "sibo"
        })
    }

    @Post('create')
    create (@Body() body: any, @Ip() ip): any {
        console.log(ip)
        return body
    }

    @Get(':id')
    findOne (@Param('id') id: string): any {
        console.log(id)
        return `Found one with id: ${id}`
    }
}