/**
 * Represents a media item.
 *
 * @property {boolean} adult - Whether the media item is suitable for adult audiences.
 * @property {number[]} genre_ids - An array of the media item's genre IDs.
 * @property {number} id - The media item's unique ID.
 * @property {string} original_language - The language the media item was originally released in.
 * @property {string} overview - A brief summary of the media item's plot.
 * @property {number} popularity - The media item's popularity rating.
 * @property {string} poster_path - The file path of the media item's poster image.
 * @property {string} title - The media item's title (for movies) or original_name (for TV shows).
 * @property {number} vote_average - The media item's average rating.
 * @property {number} vote_count - The number of votes the media item has received.
 * @property {string} backdrop_path - The file path of the movie's backdrop image.
 */
export interface MediaItem {
  adult: boolean;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
}

/**
 * Represents a movie.
 *
 * @extends MediaItem
 * @property {string} media_type - The type of media the movie represents.
 * @property {string} original_title - The movie's original title.
 * @property {string} release_date - The date the movie was released.
 * @property {boolean} video - Whether the movie is a video.
 */
export interface Movie extends MediaItem {
  media_type: string;
  original_title: string;
  release_date: string;
  video: boolean;
}

/**
 * Represents a TV show.
 *
 * @extends MediaItem
 * @property {number} first_air_date - The date when the TV show first aired.
 * @property {string} original_name - The TV show's original name.
 * @property {string} name - The TV show's name.
 */
export interface TvShow extends MediaItem {
  first_air_date: number;
  original_name: string;
  name: string;
}
