import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { SocketGateway } from './socket/socket.controller';
import { ChatController } from './chat/chat.controller';
import { HttpModule } from '@nestjs/axios';
import { ChatService } from './chat/chat.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, CatsController, ChatController],
  providers: [AppService, SocketGateway, ChatService],
})
export class AppModule {}
