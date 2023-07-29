interface IMaiMovies {
  backdrop_path: string;
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  name?:string,
  mediaType: string;
}

export default IMaiMovies;