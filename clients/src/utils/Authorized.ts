import { API } from "./Core";

async function Authorized() {
  const token = sessionStorage.getItem("maiToken");
  if (token === null) {
    return false;
  } else {
    const result = await API.post(
      "/auth",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (result.status !== 200) {
      return false;
    }
    return result.data.auth;
  }
}
export default Authorized;
