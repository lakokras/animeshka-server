import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserAnimes } from "./user-animes.model";

interface AnimeCreationAttrs {
    id: string;
    title: string;
}

@Table({tableName: 'animes'})
export class Anime extends Model<Anime, AnimeCreationAttrs> {
    @ApiProperty({example: '1', description: 'unique identifier'})
    @Column({type: DataType.TEXT, unique: true, primaryKey: true})
    id: string;

    @ApiProperty({example: 'jujutsu kaisen', description: 'anime title'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: 'description', description: 'anime description'})
    @Column({type: DataType.STRING, allowNull: true})
    description: string;

    @BelongsToMany(() => User, () => UserAnimes)
    users: User[];
}