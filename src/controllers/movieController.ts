import { Request, Response } from 'express';
import { Movie } from '../models/moviesModel';
import { Comment } from '../models/commentModel';
import axios from 'axios';


class MovieController {
  static async getAll(req: Request, res: Response) {
    try {
      const response = await axios.get('https://swapi.dev/api/films/');
      const moviesData = response.data.results;

      const movies = await Promise.all(
        moviesData.map(async (movieData: any) => {
          const { title, episode_id, opening_crawl } = movieData;
          const movie = await Movie.findCreateFind({
            where: { name:title, id:episode_id, openingCrawl:opening_crawl },
          })
          return movie[0];
        })
      );
      res.json(movies);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getCharacters(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const movie = await Movie.findByPk(Number(id));
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      const response = await axios.get(`https://swapi.dev/api/films/${id}/`);
      const movieData = response.data.results;
      const charactersUrls = movieData.characters;

      const charactersData = await Promise.all(
        charactersUrls.map(async(url: string) => {
          const response = await axios.get(url);
          console.log(response.data)
          return response.data;
        })
      );

      res.json(charactersData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export { MovieController };