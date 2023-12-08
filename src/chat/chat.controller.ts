import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller('chat')
export class ChatController {

    constructor (private readonly chatService: ChatService) {}

    @Get('get_ice_servers')
    async getIceServers (): Promise<Observable<AxiosResponse<IceServer[]>>> {
        return this.chatService.fetchIceServers()
    }
}

interface IceServer {
    urls: string,
    username?: string,
    credential?: string
}