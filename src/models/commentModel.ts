import { DataTypes, Model } from 'sequelize';
import { Optional } from 'sequelize/types';
import { v4 as uuidv4 } from 'uuid';
import db from '../config/dbConfig';


export interface CommentAttributes {
  id: string;
  movieId: number;
  text: string;
}
 
export interface CommentCreationAttributes extends Optional<CommentAttributes, "id"> {}

export class Comment extends Model<CommentAttributes, CommentCreationAttributes> {
  id?: string;
  text?: string;
}

Comment.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize: db,
    tableName: 'Comments',
  }
);

Comment.beforeCreate((comment:Comment) => {comment.id = uuidv4()});
