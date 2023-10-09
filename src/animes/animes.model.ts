import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, Table, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface AnimeCreationAttrs {
    mal_id: number;
    title: string;
    userId: number;
}


@Table({tableName: 'animes'})
export class Anime extends Model<Anime, AnimeCreationAttrs> {
    @ApiProperty({example: '1', description: 'unique identifier'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1', description: 'unique anime identifier'})
    @Column({type: DataType.INTEGER, unique: true, allowNull: false})
    mal_id: number;

    @ApiProperty({example: 'jujutsu kaisen', description: 'anime title'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: 'description', description: 'anime description'})
    @Column({type: DataType.STRING, allowNull: true})
    description: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: User;

    @BelongsTo(() => User)
    author: User;
}