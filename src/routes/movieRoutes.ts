import express from 'express';
import { MovieController } from '../controllers/movieController';
import { CommentController } from '../controllers/commentController';

const router = express.Router();

// GET /movies
router.get('/', MovieController.getAll);

// GET /movies/:id/characters
router.get('/:id/characters', MovieController.getCharacters);

// POST /movies/:id/comments
router.post('/:id/comments', CommentController.create);

// GET /movies/:id/comments
router.get('/:id/comments', CommentController.getAll);

export { router as movieRouter };
