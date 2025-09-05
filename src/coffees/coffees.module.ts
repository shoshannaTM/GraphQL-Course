import { Module } from '@nestjs/common';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeFlavorsResolver } from './coffee-flavors.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee])],
  providers: [CoffeesResolver, CoffeesService, CoffeeFlavorsResolver]
})
export class CoffeesModule {}
