import { DataTypes, Model, Optional } from 'sequelize';
import { Comment } from './commentModel';
import db from '../config/dbConfig';


interface MovieAttributes {
  id: number;
  name: string;
  openingCrawl: string;
  commentCount: number;
}

interface MovieCreationAttributes extends Optional<MovieAttributes, "commentCount">{}

class Movie extends Model<MovieAttributes, MovieCreationAttributes> {
  id!: number;
  comments?: Comment[]; 
  commentCount?: number;
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    openingCrawl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commentCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize: db,
    tableName: 'movies',
  }
);

Movie.hasMany(Comment, {
  sourceKey: 'id',
  foreignKey: 'movie',
  as: 'comments',
})

export { Movie };
