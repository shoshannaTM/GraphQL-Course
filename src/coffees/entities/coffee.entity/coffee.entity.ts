import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "../flavor.entity/flavor.entity";

@Entity()
@ObjectType({description: 'A Coffee Model'})
export class Coffee {
    @PrimaryGeneratedColumn()
    @Field(() => ID, {description: 'Unique ID'})
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @JoinTable()
    @ManyToMany(
    type => Flavor,
    flavor => flavor.coffees,
    {
      cascade: true,
    },
  )
  flavors?: Flavor[];

  @CreateDateColumn()
  createdAt?: Date;
}
