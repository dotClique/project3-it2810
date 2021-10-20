import { ObjectType, Field } from '@nestjs/graphql';
import {MovieGroup} from "../Group/group.model";
import {User} from "../User/user.model";
@ObjectType()
export class MovieEvent {

    @Field()
    movieEventId: string;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field(type=>Date)
    date: Date;

    @Field({nullable: true})
    imageUrl?: string;

    @Field()
    location: string;

    @Field()
    movieGroupId: string;

    @Field(type=>MovieGroup, {nullable: true})
    movieGroup?: MovieGroup;

    @Field(type=>[User], {nullable: true})
    participants?: User[];
}