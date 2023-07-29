import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Authorized from "../../utils/Authorized";

const HomeAdmin=()=>{
      const navigate = useNavigate();
      const [auth, setAuth] = useState(false);
      useEffect(() => {
        Authorized()
          .then((res) => (res ? setAuth(res) : navigate("/")))
          .catch(() => navigate("/"));
      }, [navigate]);
    return auth&&(
        <div>HOME ADMIN</div>
    )
}

export default HomeAdmin;