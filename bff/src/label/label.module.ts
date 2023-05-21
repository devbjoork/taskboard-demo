import { Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelHelper } from './label.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { Label, LabelSchema } from 'src/schema/label.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Label.name, schema: LabelSchema }]),
  ],
  controllers: [],
  providers: [LabelService, LabelHelper],
  exports: [LabelService],
})
export class LabelModule {}
