import { Field, ID, ObjectType } from "@nestjs/graphql";
import { json } from "stream/consumers";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

     @Column({ type: 'json' })
    flavors: string[];
}
