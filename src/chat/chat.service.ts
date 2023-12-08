import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';

@Injectable()
export class ChatService {
    constructor (private readonly httpService: HttpService) {}

    fetchIceServers(): Observable<AxiosResponse<IceServer[]>> {
        return this.httpService.get('https://chikubanda.metered.live/api/v1/turn/credentials?apiKey=3ae8583091695c25f340f51b4f41d8e57779')
                    .pipe(
                        map(response => response.data)
                    )
    }
}

interface IceServer {
    urls: string,
    username?: string,
    credential?: string
}