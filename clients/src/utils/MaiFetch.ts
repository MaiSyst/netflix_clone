import { APITMBD } from "./Core";
import { IGenre } from "./interfaces/IMaiGenre";
import IMaiMovies from "./interfaces/IMaiMovies";
import { IMaiSeriesDetail } from "./interfaces/IMaiSeriesDetails";
import { IMaiWatchVideos } from "./interfaces/IMaiWatchVideos";

class MaiFetch {
  static byPage = async (
    type="movie",
    lang= "fr-FR",
    page = 1
  ) => {
    try {
      const r = await APITMBD.get(
        `/discover/${type}?language=${lang}&page=${page}&sort_by=popularity.desc`
      );
      return r.data as {
        page: number;
        total_pages: number;
        total_results: number;
        results: IMaiMovies[];
      };
    } catch (error) {
      console.error(error);
      return {
        page: 0,
        total_pages: 0,
        total_results: 0,
        results: new Array<IMaiMovies>(),
      };
    }
  };
  static moviesTopRated = async (page = 1, lang = "fr-FR") => {
    try {
      const r = await APITMBD.get(
        `/movie/top_rated?language=${lang}&page=${page}`
      );
      return r.data as {
        page: number;
        total_pages: number;
        total_results: number;
        results: IMaiMovies[];
      };
    } catch (error) {
      console.error(error);
      return {
        page: 0,
        total_pages: 0,
        total_results: 0,
        results: new Array<IMaiMovies>(),
      };
    }
  };
  static moviesPopular = async (page = 1, lang = "fr-FR") => {
    try {
      const r = await APITMBD.get(`/movie/popular?language=${lang}&page=${page}`);
      return r.data as {
        page: number;
        total_pages: number;
        total_results: number;
        results: IMaiMovies[];
      };
    } catch (error) {
      console.error(error);
      return {
        page: 0,
        total_pages: 0,
        total_results: 0,
        results: new Array<IMaiMovies>(),
      };
    }
  };

  static moviesUpComing = async (page = 1, lang = "fr-FR") => {
    try {
      const r = await APITMBD.get(
        `/movie/upcoming?language=${lang}&page=${page}`
      );
      return r.data as {
        page: number;
        total_pages: number;
        total_results: number;
        results: IMaiMovies[];
      };
    } catch (error) {
      console.error(error);
      return {
        page: 0,
        total_pages: 0,
        total_results: 0,
        results: new Array<IMaiMovies>(),
      };
    }
  };

  static moviesDetail = async (movie_id: number, lang = "fr-FR") => {
    try {
      const r = await APITMBD.get(`/movie/${movie_id}?language=${lang}`);
      return r.data as {
        page: number;
        total_pages: number;
        total_results: number;
        results: IMaiMovies[];
      };
    } catch (error) {
      console.error(error);
      return {
        page: 0,
        total_pages: 0,
        total_results: 0,
        results: new Array<IMaiMovies>(),
      };
    }
  };
  static seriesDetail = async (series_id: number, lang = "fr-FR") => {
    try {
      const r = await APITMBD.get(`/tv/${series_id}?language=${lang}`);
      return r.data as Promise<IMaiSeriesDetail>;
    } catch (error) {
      console.error(error);
      return {} as Promise<IMaiSeriesDetail>;
    }
  };
  static seriesSeasonDetail = async (
    series_id: number,
    season_number: number,
    lang = "fr-FR"
  ) => {
    try {
      const r = await APITMBD.get(
        `/tv/${series_id}/season/${season_number}?language=${lang}`
      );
      return r.data as {
        page: number;
        total_pages: number;
        total_results: number;
        results: IMaiMovies[];
      };
    } catch (error) {
      console.error(error);
      return {
        page: 0,
        total_pages: 0,
        total_results: 0,
        results: new Array<IMaiMovies>(),
      };
    }
  };
  static seriesEpisodeDetail = async (
    series_id: number,
    season_number: number,
    episode_number: number,
    lang = "fr-FR"
  ) => {
    try {
      const r = await APITMBD.get(
        `/tv/${series_id}/season/${season_number}/episode/${episode_number}?language=${lang}`
      );
      return r.data as {
        page: number;
        total_pages: number;
        total_results: number;
        results: IMaiMovies[];
      };
    } catch (error) {
      console.error(error);
      return {
        page: 0,
        total_pages: 0,
        total_results: 0,
        results: new Array<IMaiMovies>(),
      };
    }
  };
  static trendingAll = async (page = 1) => {
    try {
      const res = await APITMBD.get(`/trending/movie/day?page=${page}`);
      return res.data as {
        page: number;
        total_pages: number;
        total_results: number;
        results: IMaiMovies[];
      };
    } catch (error) {
      console.error(error);
      return {
        page: 0,
        total_pages: 0,
        total_results: 0,
        results: new Array<IMaiMovies>(),
      };
    }
  };
  static byMoviesGenre = async (
    genre: number,
    page = 1,
    type = "movie",
    lang = "fr-FR"
  ) => {
    try {
      const r = await APITMBD.get(
        `/discover/${type}?with_genres=${genre}&language=${lang}&page=${page}&sort_by=popularity.desc`
      );
      return r.data as {
        page: number;
        total_pages: number;
        total_results: number;
        results: IMaiMovies[];
      };
    } catch (error) {
      console.error(error);
      return {
        page: 0,
        total_pages: 0,
        total_results: 0,
        results: new Array<IMaiMovies>(),
      };
    }
  };
  static async genres(type = "movie") {
    try {
      const response = await APITMBD.get(`/genre/${type}/list?lang=fr-FR`);
      return response.data.genres as Array<IGenre>;
    } catch (error) {
      console.error(error);
      return new Array<IGenre>();
    }
  }
  static async searchMovies(
    query: string,
    type = "movie",
    page = 1
  ) {
    try {
      const response = await APITMBD.get(
        `/search/${type}?query=${query}&page=${page}&lang=fr-FR`
      );
      return response.data as {
        page: number;
        total_pages: number;
        total_results: number;
        results: IMaiMovies[];
      };
    } catch (error) {
      console.error(error);
      return {
        page: 0,
        total_pages: 0,
        total_results: 0,
        results: new Array<IMaiMovies>(),
      };
    }
  }

  static fetchVideoTrailer = async (
    movie_id: number,
    lang="fr-FR"
  ) => {
    try {
     const r = await APITMBD.get(
       `/movie/${movie_id}?append_to_response=videos&language=${lang}`
     );
      return r.data as IMaiWatchVideos
    } catch (error) {
      console.error(error);
      return <IMaiWatchVideos>{};
    }
  };
}

export default MaiFetch;
