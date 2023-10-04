/**
 * Represents a movie.
 *
 * @properties
 * - adult: Whether the movie is suitable for adult audiences.
 * - backdrop_path: The file path of the movie's backdrop image.
 * - genre_ids: An array of the movie's genre IDs.
 * - id: The movie's unique ID.
 * - media_type: The type of media the movie represents.
 * - original_language: The language the movie was originally released in.
 * - original_title: The movie's original title.
 * - overview: A brief summary of the movie's plot.
 * - popularity: The movie's popularity rating.
 * - poster_path: The file path of the movie's poster image.
 * - release_date: The date the movie was released.
 * - title: The movie's title.
 * - video: Whether the movie is a video.
 * - vote_average: The movie's average rating.
 * - vote_count: The number of votes the movie has received.
 */
export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
