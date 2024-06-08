import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, Table} from "sequelize-typescript";


@Table({tableName: 'episodes'})
export class Episodes extends Model<Episodes> {
    @ApiProperty({example: '1', description: 'unique identifier'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1', description: 'episode'})
    @Column({type: DataType.INTEGER, allowNull: false})
    episode_number: number;

    @ApiProperty({example: 'The end', description: 'title'})
    @Column({type: DataType.STRING, allowNull: true})
    title: string;

    @ApiProperty({example: 'onva.mp3', description: 'path'})
    @Column({type: DataType.STRING, allowNull: false})
    episode_path: string;

    @ApiProperty({example: '1', description: 'anime.mal_id'})
    @Column({type: DataType.INTEGER, allowNull: false})
    anime_id: number;
}