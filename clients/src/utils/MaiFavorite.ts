import { API } from "./Core"
import IMaiMovies from "./interfaces/IMaiMovies";

export interface IMaiFavoriteMessage{
  message:string
}
class MaiFavorite {
  static fetchFavorite = async () => {
    try {
      let token = sessionStorage.getItem("maiToken");
      let idUser = sessionStorage.getItem("maiUserId");
      if (token !== null) {
        let r = await API.get(`/user/favorites/${idUser}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return r.data as Array<IMaiMovies>;
      } else {
        return new Array<IMaiMovies>();
      }
    } catch (error) {
      console.error("Favorite=" + error);
      return new Array<IMaiMovies>();
    }
  };
  static addFavorite = async <IMaiFavoriteMessage>(movies: IMaiMovies) => {
    try {
      let token = sessionStorage.getItem("maiToken");
      let idUser = sessionStorage.getItem("maiUserId");
      if (token !== null) {
        let r = await API.post(`/user/favorites/${idUser}`, movies, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return r.data as IMaiFavoriteMessage;
      }
    } catch (error) {
      return { message: "error" };
    }
  };
  static removeFavorite = async <IMaiFavoriteMessage>(idMovies: number) => {
    ///user/favorites/:idUser/:idMovies
    try {
      let token = sessionStorage.getItem("maiToken");
      let idUser = sessionStorage.getItem("maiUserId");
      if (token !== null) {
        let r = await API.delete(`/user/favorites/${idUser}/${idMovies}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return r.data as Promise<IMaiFavoriteMessage>;
      }
    } catch (error) {
      return Promise<{ message: "error" }>;
    }
  };
}

export default MaiFavorite;