import { Model, Column, DataType, Table, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Anime } from "./animes.model";

@Table({tableName: 'user_animes', createdAt: false, updatedAt: false})
export class UserAnimes extends Model<UserAnimes> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Anime)
    @Column({type: DataType.INTEGER})
    animeId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
}