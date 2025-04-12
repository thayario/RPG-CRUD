import { Module } from '@nestjs/common';
import { MagicItemsService } from './magic-items.service';
import { MagicItemsController } from './magic-items.controller';

@Module({
  controllers: [MagicItemsController],
  providers: [MagicItemsService],
})
export class MagicItemsModule {}
