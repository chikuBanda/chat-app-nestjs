import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { SocketGateway } from './socket/socket.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
