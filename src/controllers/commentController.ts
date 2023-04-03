import { Request, Response } from 'express';
import { Movie } from '../models/moviesModel';
import { Comment } from '../models/commentModel';

class CommentController {
  static async create(req: Request, res: Response) {
    const { id } = req.params;
    const { text } = req.body;

    try {
      const movie = await Movie.findByPk(Number(id));
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      const comment = await Comment.create({ movieId: movie.id, text });
      movie.commentCount ? movie.commentCount++ : (movie.commentCount = 1);
      await movie.save();

      res.json(comment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getAll(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const movie = await Movie.findByPk(Number(id));
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      const comments = await Comment.findAll({
        where: { movieId: movie.id },
      });

      res.json(comments.map(comment => comment.text));
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export { CommentController };
