import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { InMemoryDatabaseModule } from './database/inMemoryDatabase.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [InMemoryDatabaseModule, UserModule, ArtistModule, TrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
