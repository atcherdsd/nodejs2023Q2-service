import { Global, Module } from '@nestjs/common';
import InMemoryDatabase from './inMemoryDatabase';

@Global()
@Module({
  providers: [InMemoryDatabase],
  exports: [InMemoryDatabase],
})
export class InMemoryDatabaseModule {}
