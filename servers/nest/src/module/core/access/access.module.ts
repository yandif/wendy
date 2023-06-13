import { Module } from '@nestjs/common';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';

@Module({
  controllers: [AccessController],
  providers: [AccessService],
})
export class AccessModule {}
