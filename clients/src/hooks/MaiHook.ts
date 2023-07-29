import { IMaiSeriesDetail } from './../utils/interfaces/IMaiSeriesDetails';
import { useEffect, useMemo, useState } from "react"
import IMaiMovies from "../utils/interfaces/IMaiMovies"
import MaiFetch from "../utils/MaiFetch"
import { IGenre } from "../utils/interfaces/IMaiGenre";
export interface IMoviesServer {
    pageTotal: number;
    totalResults: number;
    items: IMaiMovies[]
}
export interface IMoviesByGenresServer {
  pageTotal: number;
  totalResults: number;
  items: IMaiMovies[];
  genre:string
}
export const useMaiFetchMovies = (
  page:number=1,
  type: string = "movie",
  lang: string = "fr-FR"
) => {

  const [data, setData] = useState<IMoviesServer[]>([]);
  const [loading, setLoading] = useState(false);
  const [reload,setReload] = useState(1)
  const [titleRandom, setTitleRandom] = useState("");
  const [descRandom, setDescRandom] = useState("");
  const [imageRandom, setImageRandom] = useState("");
  useEffect(() => {
    setLoading(true)
    MaiFetch.byPage(type, lang, reload|page)
      .then((res) => {
        let index = Math.floor(Math.random() * res.results.length);
        setData(
            prev=>[...prev,{pageTotal: res.total_pages, totalResults: res.total_results, items: res.results} as IMoviesServer]);
            setTitleRandom(res.results[index].title);
            setDescRandom(res.results[index].overview);
            setImageRandom(res.results[index].backdrop_path);
        setLoading(false)
      })
      .catch((err) => console.error(err));
  }, [reload]);
  return useMemo(
    () => ({
      data,
      setData,
      setReload,
      loading,
      descRandom,
      imageRandom,
      titleRandom,
    }),
    [reload,data]
  );
};

export const useMaiFetchMoviesTopRated = (page:number=1,lang:string="fr-FR")=> {
 const [data,setData] = useState(<IMoviesServer>{});
  useEffect(()=>{
    MaiFetch.moviesTopRated(page,lang)
  .then(res=>{
    setData({
      pageTotal: res.total_pages,
      totalResults: res.total_results,
      items: res.results,
    } as IMoviesServer);
  })
  .catch(err=>console.error(err))
  },[])
  return {...data}
};
export const useMaiFetchMoviesByGenre = (
  page: number = 1,
  lang: string = "fr-FR"
) => {
  const [itemsMoviesGenre, setItemsMoviesGenre] = useState(Array<IMoviesServer>);
  const [genreChange, setGenreChange] = useState(0);
  const [nextPage, setNextPage] = useState(page);
  useEffect(() => {
   if(genreChange!==0){
     MaiFetch.byMoviesGenre(genreChange, nextPage, "movie", lang)
       .then((res) => {
         setItemsMoviesGenre((prev) => [
           ...prev,
           {
             pageTotal: res.total_pages,
             totalResults: res.total_results,
             items: res.results,
           } as IMoviesServer,
         ]);
       })
       .catch((err) => console.error(err));
   }else{
    setItemsMoviesGenre(new Array<IMoviesServer>());
   }
  }, [genreChange, nextPage]);
  return { itemsMoviesGenre, setGenreChange, genreChange, setNextPage };
};
export const useMaiFetchMoviesPopular = (page:number=1,lang:string="fr-FR")=> {
 const [data,setData] = useState(<IMoviesServer>{});
  useEffect(()=>{
    MaiFetch.moviesPopular(page,lang)
  .then(res=>{
    setData({
      pageTotal: res.total_pages,
      totalResults: res.total_results,
      items: res.results,
    } as IMoviesServer);
  })
  .catch(err=>console.error(err))
  },[])
  return {...data}
};
export const useMaiFetchMoviesUpcoming = (page:number=1,lang:string="fr-FR")=> {
 const [data,setData] = useState(<IMoviesServer>{});
  useEffect(()=>{
    MaiFetch.moviesUpComing(page,lang)
  .then(res=>{
    setData({
      pageTotal: res.total_pages,
      totalResults: res.total_results,
      items: res.results,
    } as IMoviesServer);
  })
  .catch(err=>console.error(err))
  },[])
  return {...data}
};

export const useMaiFetchMoviesByGenres = (
  genres: Array<IGenre>,
  page: number = 1,
  lang: string = "fr-FR"
) => {
  const [data, setData] = useState(new Array<IMoviesByGenresServer>());
  useEffect(() => {
    let result = new Array<IMoviesByGenresServer>();
    for(let i=0;i<genres.length;i++){
      MaiFetch.byMoviesGenre(genres[i].id, page+i, "movie", lang)
        .then((res) => {
          result.push({
            pageTotal: res.total_pages,
            totalResults: res.total_results,
            items: res.results,
            genre: genres[i].name,
          } as IMoviesByGenresServer);
        })
        .catch((err) => console.error(err));
    }
    setData(result);
  }, []);
  return data;
};

export const useMaiFetchTrending=(page:number=1)=>{
  const [data, setData] = useState(<IMoviesServer>{});
  useEffect(() => {
    MaiFetch.trendingAll(page)
      .then((res) => {
        setData({
          pageTotal: res.total_pages,
          totalResults: res.total_results,
          items: res.results,
        } as IMoviesServer);
      })
      .catch((err) => console.error(err));
  }, []);
  return { ...data };
};
export const useMaiFetchVideoTrailer = (
  movie_id: number|null,
  lang: string = "fr-FR"
) => {
  const [trailers, setTrailers] = useState(new Array<string>());
  const [movie_idChange, setMovie_idChange] = useState(movie_id);
  useEffect(() => {
    if (movie_idChange!==null) {
      MaiFetch.fetchVideoTrailer(movie_idChange, lang)
        .then((result) => {
          if (result.videos) {
            let data = [];
            for (let i = 0; i < result.videos.results.length; i++) {
              if (result.videos.results[i].type === "Trailer") {
                data.push(parserKeyToUrlYoutube(result.videos.results[i].key));
              }
            }
            setTrailers(data);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [movie_idChange,movie_id]);

  return { trailers, setMovie_idChange };
};

export const useMaiFetchGenreMovies=()=>{
  const [genres,setGenres]=useState(new Array<IGenre>)
  useEffect(()=>{
    MaiFetch.genres()
      .then((res) => {
        setGenres(res);
      })
      .catch((err) => console.log(err));
  },[])

  return {genres}
}
export const useMaiFetchSeriesDetail=(series_id:number)=>{
  const [itemSeries,setItemsSeries]=useState({} as IMaiSeriesDetail);
  useEffect(()=>{
      MaiFetch.seriesDetail(series_id)
      .then(res=>{
        setItemsSeries(res)
      })
      .catch((err=>console.error(err)))
  },[])
  return { ...itemSeries };
}
//https://www.youtube.com/watch?v=r7qovpFAGrQ&list=RDpBfbC27JaFY
const parserKeyToUrlYoutube=(key:string):string=>{
  return `https://www.youtube.com/watch?v=${key}`;
}