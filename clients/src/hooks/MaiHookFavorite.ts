import { useEffect, useState } from "react"
import MaiFavorite, { IMaiFavoriteMessage } from "../utils/MaiFavorite";
import IMaiMovies from "../utils/interfaces/IMaiMovies";

export const useMaiFetchFavorite=()=>{
    const [data,setData]=useState(new Array<IMaiMovies>());
    const [reload,setReload]=useState(0);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        setLoading(true)
        MaiFavorite.fetchFavorite().then(result=>{
            setData(result)
            setLoading(false);
        }).catch(err=>console.error(err))
    },[reload])
    return { data, setReload, loading, setLoading, setData };
}
/**
 * 
 * @param {IMaiMovies} movies 
 * @returns 
 * backdrop_path: string;
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  mediaType: string;
 */
export const useMaiAddFavorite = async (movies: IMaiMovies) => {
  const result=await MaiFavorite.addFavorite(movies)
    
  return result as Promise<IMaiFavoriteMessage>;
};
export const useMaiRemoveFavorite = async (moviesId:number) => {
  const result=await MaiFavorite.removeFavorite(moviesId)
  return result as Promise<IMaiFavoriteMessage>;
};