import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/dto/create-coffee.input';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { UpdateCoffeeInput } from './dto/dto/update-coffee.input';
import { Flavor } from './entities/flavor.entity/flavor.entity';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorsRepository: Repository<Flavor>,
    ){}

  async findAll() {
    return this.coffeeRepository.find();
  }
  
  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({ where: { id }});
    if(!coffee){
        throw new UserInputError('Coffee with id ' + id + ' doesn\'t exist');
    }
    return coffee;
  }
  
  async create(createCoffeeInput: CreateCoffeeInput) {
  const flavors = await Promise.all(
    createCoffeeInput.flavors.map(name => this.preloadFlavorByName(name)),
  );
  const coffee = this.coffeeRepository.create({
    ...createCoffeeInput,
    flavors,
  });
  return this.coffeeRepository.save(coffee);
}

   async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
  const flavors =
        updateCoffeeInput.flavors && // 👈 new
        (await Promise.all(
          updateCoffeeInput.flavors.map(name => this.preloadFlavorByName(name)),
        ));
  const coffee = await this.coffeeRepository.preload({
    id,
    ...updateCoffeeInput,
    flavors,
  });   
}

  async remove(id: number){
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

   private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorsRepository.findOne({ where: { name } });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorsRepository.create({ name });
  }
}