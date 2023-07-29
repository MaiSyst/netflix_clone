export interface IMaiSeriesDetail {
  backdrop_path: string;
  first_air_date: string;
  id: number;
  in_production: boolean;
  last_air_date: string;
  last_episode_to_air: IMaiLastEpisodeToAir;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  overview: string;
  popularity: number;
  poster_path: string;
  seasons: IMaiSeason[];
  status: string;
  type: string;
  vote_average: number;
}

export interface IMaiLastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: any;
}

export interface IMaiSeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path?: string;
  season_number: number;
  vote_average: number;
}