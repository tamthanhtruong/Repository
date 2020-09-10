import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreStoreModule } from './core/core-store.module';

@Module({
  imports: [
    CoreStoreModule,
    MongooseModule.forRoot('mongodb+srv://tam:5jZl42DhSE5FIe7i@cluster0-r8k78.mongodb.net/dummy-data?retryWrites=true&w=majority'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
